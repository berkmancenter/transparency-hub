'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { ProjectData } from "../../src/types"

function ProjectBlob({
  title,
  authors,
  description,
  link,
  image,
  img_title,
  img_alt
}: {
  title: string,
  authors: string,
  description: string,
  link: string,
  image: string,
  img_title: string,
  img_alt: string
}) {
  return (
    <div className="flex flex-col ASML_Text rounded-xl border border-[#D1A4D180] bg-[#CEDADE1A]">
      <img title={img_title} className="rounded-t-[8px] min-h-[410px] max-h-[410px] object-cover object-top" src={image} alt={img_alt} />
      <div className="p-4 flex flex-col gap-4 h-full justify-between">
        <div>
          <Link 
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h3 className="font-bold underline text-[24px] inline">
              {title} 
            </h3>
            <img className="ml-1 mb-1 w-[10px] inline" src="/Arrow_right_logomark.png" alt="" />
          </Link>
          <h4 className="Paragraph !font-bold">
            {authors}
          </h4>
        </div>
        <div className="flex h-full items-center">
          <p className="Paragraph">
            {description}
          </p>
        </div>
      </div>
    </div>
  )}

export default function ProjectShowcase() {
  // Update to use a list of projects from MongoDB and pull images from the Google Cloud Bucket
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
      async function fetchProjects() {
        try {
          const response = await fetch('/api/project-details/');
          const data = await response.json();
          setProjects(data.projects);
        } catch (error) {
          console.error('Error fetching project data:', error);
          setProjects([]);
        }
      }
  
      fetchProjects();
    }, []);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-6 py-2">
      {projects.map(project => <ProjectBlob key={project._id} title={project.title} authors={project.authors} description={project.description} link={project.link} image={project.image} img_title={project.img_title} img_alt={project.img_alt}/>)}
    </div>
  )
}