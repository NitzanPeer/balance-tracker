import { db } from "../firebase";
import { collection, doc, getDoc, updateDoc, setDoc, addDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export async function getTransactions(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data().transactions || [];
    } else {
      console.log("No such document!");
      return []; // Return an empty array if document doesn't exist
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error; // Re-throw the error to handle it where getTransactions is called
  }
}

export async function saveTransactions(userId, transactions) {
  try {
    const userDocRef = doc(db, "users", userId);
    await updateDoc(userDocRef, {
      transactions: transactions
    });
    console.log("Transactions saved successfully");
  } catch (error) {
    console.error("Error saving transactions:", error);
    throw error; // Re-throw the error to handle it where saveTransactions is called
  }
}

export async function addTransaction(userId, transactions, newTransaction) {

  const updatedTransactions = [...transactions, newTransaction];

  try {
    await saveTransactions(userId, updatedTransactions)
    console.log("Transactions added successfully");
  } catch (error) {
    console.error("Error saving transactions:", error);
    // throw error; // Re-throw the error to handle it where addTransaction is called
  }

  return updatedTransactions;
}

// two ways to remove a transaction in firestore:
// 1. Pass in the ENTIRE object and use arrayRemove()
// 2. Read the document(?), manually remove the element from array and update the document back
export async function removeTransaction(userId, transaction) {
  try {
    const userDocRef = doc(db, "users", userId);

    await updateDoc(userDocRef, {
      transactions: arrayRemove(transaction),
    });

    console.log("Transaction removed successfully");
  } catch (error) {
    console.error("Error removing transaction:", error);
  }
}

// This function is made to handle an old date type (string) which I used initially
// and a new one (timestamp used by firebase's firestore)
export function filterTransactionsByMonth(transactions, selectedMonth) {
  if (!transactions.length) {
    return [];
  }
  if (!selectedMonth) {
    return transactions; // If no month is selected, return all transactions
  } else {
    return transactions.filter((transaction) => {
      let transactionDate;
      if (typeof transaction.date === 'string') {
        // Parse date string
        transactionDate = new Date(transaction.date);
      } else if (transaction.date instanceof Date) {
        // Date object
        transactionDate = transaction.date;
      } else {
        // Assume it's a Firestore Timestamp
        transactionDate = transaction.date.toDate(); // Convert Firestore Timestamp to Date
      }
      const transactionMonth = transactionDate.getMonth() + 1; // Month is 0-based
      return transactionMonth === parseInt(selectedMonth.substring(5, 7));
    });
  }
}