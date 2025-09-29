using ExpenseNavigatorAPI.DAL;
using ExpenseNavigatorAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseNavigatorAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpenseController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpenseController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var expenses = _expenseService.GetAll();
            return Ok(expenses);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var expense = _expenseService.GetById(id);
            if (expense == null) return NotFound();
            return Ok(expense);
        }

        [HttpPost]
        public IActionResult Add([FromBody] Expense expense)
        {
            var added = _expenseService.Add(expense);
            return CreatedAtAction(nameof(GetById), new { id = added.Id }, added);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var deleted = _expenseService.Delete(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [HttpGet("report")]
        public IActionResult GetReport([FromQuery] int month, [FromQuery] int year)
        {
            var report = _expenseService.GetByMonthYear(month, year);
            return Ok(report);
        }
    }

}
