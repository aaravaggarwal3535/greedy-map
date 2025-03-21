import React from "react";
import { LearningContent } from "@/components/learning-content";

// Example data structure - replace with your actual data
const courseData = [
  {
    id: "course1",
    title: "Web Development Fundamentals",
    topics: [
      {
        id: "topic1",
        title: "HTML Basics",
        content: [
          {
            id: "content1",
            title: "HTML Document Structure",
            videoUrl: "/videos/html-structure.mp4",
            documentation: `
              <p>HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.</p>
              <h5>Basic Structure</h5>
              <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
            `
          },
          {
            id: "content2",
            title: "HTML Forms",
            videoUrl: "/videos/html-forms.mp4",
            documentation: `
              <p>HTML forms allow users to enter data that is sent to a server for processing.</p>
              <h5>Form Example</h5>
              <pre><code>&lt;form action="/submit" method="post"&gt;
  &lt;label for="name"&gt;Name:&lt;/label&gt;
  &lt;input type="text" id="name" name="name"&gt;
  &lt;input type="submit" value="Submit"&gt;
&lt;/form&gt;</code></pre>
            `
          }
        ]
      },
      {
        id: "topic2",
        title: "CSS Styling",
        content: [
          {
            id: "content3",
            title: "CSS Selectors",
            videoUrl: "/videos/css-selectors.mp4",
            documentation: `
              <p>CSS selectors are patterns used to select the elements you want to style.</p>
              <h5>Common Selectors</h5>
              <ul>
                <li><code>element</code> - selects all elements with the given tag name</li>
                <li><code>.class</code> - selects all elements with the given class</li>
                <li><code>#id</code> - selects the element with the given ID</li>
              </ul>
            `
          }
        ]
      }
    ]
  }
];

export default function LearningPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Learning Portal</h1>
      <LearningContent courses={courseData} />
    </div>
  );
}
