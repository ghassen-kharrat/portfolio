import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Loader } from '@react-three/drei';

interface Project {
  title: string;
  image: string;
  url: string;
}

interface ProjectShowcaseProps {
  projects: Project[];
}

// Simple card mesh component instead of complex laptop
const ProjectCard = ({ 
  position, 
  rotation, 
  imageUrl, 
  title, 
  projectUrl 
}: { 
  position: [number, number, number];
  rotation: [number, number, number];
  imageUrl: string;
  title: string;
  projectUrl: string;
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh scale={hovered ? 1.1 : 1} position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.5, 0.1]} />
        <meshStandardMaterial color={hovered ? "#64ffda" : "#112240"} />
      </mesh>
      
      {/* Text displayed alongside the card */}
      <group position={[0, -2, 0]}>
        <mesh>
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial color="#0a192f" />
        </mesh>
      </group>
    </group>
  );
};

const ProjectShowcase = ({ projects }: ProjectShowcaseProps) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProject = projects[currentProjectIndex];
  
  const nextProject = () => {
    setCurrentProjectIndex((prev) => 
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevProject = () => {
    setCurrentProjectIndex((prev) => 
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };
  
  return (
    <div className="relative w-full h-[500px] md:h-[600px]">
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#0a192f']} />
        <fog attach="fog" args={['#0a192f', 10, 20]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        <Suspense fallback={null}>
          <group>
            {projects.map((project, index) => {
              // Calculate position based on current index
              const isActive = index === currentProjectIndex;
              const angle = Math.PI / 4 * (index - currentProjectIndex);
              const x = Math.sin(angle) * 4;
              const z = -Math.cos(angle) * 4;
              const opacity = isActive ? 1 : 0.5;
              
              return (
                <ProjectCard
                  key={project.title}
                  position={[x, 0, z]}
                  rotation={[0, -angle, 0]}
                  imageUrl={project.image}
                  title={project.title}
                  projectUrl={project.url}
                />
              );
            })}
          </group>
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2.5}
          rotateSpeed={0.5}
        />
      </Canvas>
      <Loader />
      
      {/* Project Info Overlay */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-10 bg-primary/80 backdrop-blur-sm p-4 rounded-lg mx-4">
        <h3 className="text-xl font-bold text-lightest-gray mb-2">{currentProject.title}</h3>
        <div className="flex justify-center gap-4 mt-2">
          <button 
            onClick={prevProject}
            className="px-3 py-1 bg-tertiary hover:bg-secondary hover:text-primary rounded-md transition-colors"
          >
            Previous
          </button>
          <a 
            href={currentProject.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-3 py-1 bg-secondary text-primary rounded-md hover:bg-secondary/80 transition-colors"
          >
            View Project
          </a>
          <button 
            onClick={nextProject}
            className="px-3 py-1 bg-tertiary hover:bg-secondary hover:text-primary rounded-md transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase; 