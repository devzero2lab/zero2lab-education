import Link from "next/link";

export default function CoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Courses</h1>
      <p>Welcome to the courses page!</p>
      <Link href={"/admin/course/addcourse"}>add course</Link>
    </div>
  );
}
