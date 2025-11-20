namespace Comments.Api.Models
{
    public class Comment
    {
        public int Id { get; set; }

        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? HomePage { get; set; }

        public string Text { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Для вложенных комментариев
        public int? ParentId { get; set; }
        public Comment? Parent { get; set; }
        public List<Comment> Replies { get; set; } = new();
    }
}
