import { Entry, EntrySkeletonType } from "contentful";
import client from "./lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

interface ContentFields extends EntrySkeletonType {
  fields: {
    body: Document | null;
    coverImage: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    publishDate: string;
  };
  contentTypeId: string;
}

type ContentEntry = Entry<ContentFields>;

export default async function HomePage() {
  try {
    const response = await client.getEntries<ContentFields>({
      content_type: "blogPost",
    });

    const entries = response.items;

    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>
        <ul className="space-y-8">
          {entries.map((entry) => (
            <li
              key={entry.sys.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              {entry.fields.coverImage && (
                <img
                  src={`https:${entry.fields.coverImage.fields.file.url}`}
                  alt="Cover Image"
                  className="w-full h-auto rounded-lg mb-4"
                />
              )}

              <p className="text-gray-600 text-sm mb-4">
                Published on:{" "}
                {new Date(entry.fields.publishDate).toDateString()}
              </p>

              <div className="prose">
                {entry.fields.body ? (
                  documentToReactComponents(entry.fields.body)
                ) : (
                  <p>No content available</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    return <div>Error loading data</div>;
  }
}
