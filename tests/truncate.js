import { Expense, Advance } from '../../models';

module.exports = {
  async truncateExpense() {
    return await Expense.destroy({ truncate: true, restartIdentity: true });
  },
  async truncateAdvance() {
    return await Advance.destroy({ truncate: true, restartIdentity: true });
  }
}
