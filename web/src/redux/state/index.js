/*
  state = {
    expenses: {
      fetchingExpenses: boolean,
      addingExpense: boolean,
      updatingExpense: boolean,
      removingExpense: boolean,
      errors: null | Error,
      list: Expense[],
    },
    advances: {
      fetchingAdvances: boolean,
      addingAdvance: boolean,
      updatingAdvance: boolean,
      removingAdvance: boolean,
      errors: null | Error,
      list: Advance[],
    },
    total: {
      fetchingTotal: boolean,
      errors: null | Error,
      total: {
        totalCommon: INT,
        nils: {
          expenses: INT,
          advances: INT,
          total: INT,
        },
        vio:{
          expenses: INT,
          advances: INT,
          total: INT,
        },
      },
    }
  }

  Expense = {
    id: int,
    description: string,
    date: string,
    cost: number,
    buyer: string,
  }

  Advance = {
    id: int,
    description: string,
    date: string,
    cost: number,
    buyer: string,
  }

 */
