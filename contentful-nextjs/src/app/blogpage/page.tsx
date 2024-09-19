import { Entry, EntrySkeletonType } from "contentful";
import client from "../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";
import authorImage from "../../../assests/author.jpeg";
import { AiOutlineDelete } from "react-icons/ai";

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
    title: string;
    author: string;
    readingTime: string;
  };
  contentTypeId: string;
}

type ContentEntry = Entry<ContentFields>;

export default async function BlogPage() {
  const response = await client.getEntries<ContentFields>({
    content_type: "blogPost",
  });

  const entries = response.items;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-8">Blog Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {entries.map((entry) => (
          <div
            key={entry.sys.id}
            className="flex bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-4 flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <img
                    src={authorImage.src}
                    alt={entry.fields.author}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <p className="text-sm font-semibold">
                      {entry.fields.author}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-500 text-xs mr-2">
                    {new Date(entry.fields.publishDate).toLocaleDateString()}
                  </p>

                  <button className="text-gray-500 hover:text-red-500">
                    <AiOutlineDelete size={20} />
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-bold mb-2">{entry.fields.title}</h2>

              <div
                className="prose text-gray-700 overflow-hidden"
                style={{ maxHeight: "70px" }}
              >
                {entry.fields.body ? (
                  documentToReactComponents(entry.fields.body)
                ) : (
                  <p>No content available</p>
                )}
              </div>
            </div>

            {entry.fields.coverImage && (
              <img
                src={`https:${entry.fields.coverImage.fields.file.url}`}
                alt="Cover Image"
                className="w-48 h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
