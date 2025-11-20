using Comments.Api.Data;
using Comments.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Comments.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/comments
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var comments = await _context.Comments
                .Where(c => c.ParentId == null)
                .Include(c => c.Replies)
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();

            return Ok(comments);
        }

        // POST api/comments
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Comment comment)
        {
            comment.CreatedAt = DateTime.UtcNow;

            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }
    }
}
