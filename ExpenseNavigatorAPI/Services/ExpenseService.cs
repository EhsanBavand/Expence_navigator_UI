using ExpenseNavigatorAPI.DAL;
using ExpenseNavigatorAPI.Models;

namespace ExpenseNavigatorAPI.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly List<Expense> _expenses = new List<Expense>();

        public IEnumerable<Expense> GetAll()
        {
            return _expenses;
        }

        public Expense GetById(Guid id)
        {
            return _expenses.FirstOrDefault(e => e.Id == id);
        }

        public Expense Add(Expense expense)
        {
            expense.Id = Guid.NewGuid();
            _expenses.Add(expense);
            return expense;
        }

        public bool Delete(Guid id)
        {
            var expense = _expenses.FirstOrDefault(e => e.Id == id);
            if (expense == null) return false;

            _expenses.Remove(expense);
            return true;
        }

        public IEnumerable<Expense> GetByMonthYear(int month, int year)
        {
            return _expenses
                .Where(e => e.Date.Month == month && e.Date.Year == year)
                .ToList();
        }
    }

}
