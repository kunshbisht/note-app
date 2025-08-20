export function markdownToHtml(str: string) {
  return str
    .replaceAll("\\\\", "§§BSL§§")
    .replaceAll("\\*", "§§AMP§§")
    .replaceAll("\\_", "§§UND§§")
    .replaceAll("\\`", "§§CODE§§")
    .replaceAll("\\~", "§§TILDE§§")
    .replace(/\*(.+?)\*/g, "<b>$1</b>")
    .replace(/_(.+?)_/g, "<i>$1</i>")
    .replace(/~(.+?)~/g, "<s>$1</s>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replaceAll("§§BSL§§", "\\")
    .replaceAll("§§AMP§§", "*")
    .replaceAll("§§UND§§", "_")
    .replaceAll("§§CODE§§", "`")
    .replaceAll("§§TILDE§§", "~");
}

export function htmlToMarkdown(str: string) {
  return str
    // Escape special Markdown chars first
    .replaceAll("\\", "\\\\")
    .replaceAll("*", "\\*")
    .replaceAll("_", "\\_")
    .replaceAll("`", "\\`")
    .replaceAll("~", "\\~")
    .replace(/<b>(.+?)<\/b>/g, "*$1*")
    .replace(/<i>(.+?)<\/i>/g, "_$1_")
    .replace(/<s>(.+?)<\/s>/g, "~$1~")
    .replace(/<code>(.+?)<\/code>/g, "`$1`")
    .replace(/<a href="([^"]+)">(.+?)<\/a>/g, "[$2]($1)");
}