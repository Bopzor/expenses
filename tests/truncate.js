import { Expense } from '../models';

module.exports = async function truncateExpense() {
  return await Expense.destroy({ truncate: true, restartIdentity: true });
}
