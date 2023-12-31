// Library
import { createClient } from "contentful";

// Components
import ResourceCard from "@/components/Card/ResourceCard";

export async function GET(request) {
  const url = new URL(request.url);
  const limit = url.searchParams.get("limit") || 6;

  const resources = await fetchContentful(category, skip, limit);

  
}

async function fetchContentful(category, skip, limit) {


  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const res = await client.getEntries({
    content_type: "resourcesPage",
    include: 2,
    skip, 
    limit,
    order: ["fields.title"],
    "fields.category.sys.contentType.sys.id": "categories",
    "fields.category.fields.category": category === "all" ? null : category,
  });

  return res.items;
}

export default async function ResourceContainer({ category }) {
 


  const resources = await fetchContentful(category);

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {resources.map((resource) => {
          return <ResourceCard key={resource.sys.id} resource={resource} />;
        })}
      </div>
    </>
  );
}
