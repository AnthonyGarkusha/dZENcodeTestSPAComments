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
        public async Task<IEnumerable<Comment>> Get()
        {
            var comments = await _context.Comments.ToListAsync();

            return comments.Select(c => new Comment
            {
                Id = c.Id,
                UserName = c.UserName,
                Email = c.Email,
                HomePage = c.HomePage,
                Text = c.Text,
                CreatedAt = c.CreatedAt,
                ParentId = c.ParentId
            }).ToList();
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
