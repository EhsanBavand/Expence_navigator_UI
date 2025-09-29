using ExpenseNavigatorAPI.Models;

namespace ExpenseNavigatorAPI.DAL
{
    public interface IExpenseService
    {
        IEnumerable<Expense> GetAll();
        Expense GetById(Guid id);
        Expense Add(Expense expense);
        bool Delete(Guid id);

        // Report by month/year
        IEnumerable<Expense> GetByMonthYear(int month, int year);
    }

}
