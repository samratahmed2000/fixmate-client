const AdminUserDate = ({ value }: { value: string | null }) => {
  if (!value) {
    return <span className="text-muted-foreground">Unknown</span>;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return <span className="text-muted-foreground">Unknown</span>;
  }

  return (
    <time dateTime={value} className="whitespace-nowrap">
      {new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }).format(date)}
    </time>
  );
};

export default AdminUserDate;
