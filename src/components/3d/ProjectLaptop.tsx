import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import { Mesh, Group } from 'three';

interface ProjectLaptopProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  imageUrl: string;
  projectUrl: string;
  title: string;
}

const ProjectLaptop = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0], 
  scale = 1,
  imageUrl,
  projectUrl,
  title
}: ProjectLaptopProps) => {
  const groupRef = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animation
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Gentle floating animation
    groupRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    
    // Rotation animation when hovered
    if (hovered) {
      groupRef.current.rotation.y = rotation[1] + Math.sin(state.clock.getElapsedTime() * 2) * 0.05;
    }
  });
  
  return (
    <group 
      ref={groupRef}
      position={position as [number, number, number]}
      rotation={rotation as [number, number, number]}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Simple laptop model */}
      <group>
        {/* Base */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.1, 1.5]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Screen */}
        <group position={[0, 0.6, -0.7]} rotation={[Math.PI / 6, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 0.05, 1.2]} />
            <meshStandardMaterial color="#2a2a2a" />
          </mesh>
          
          {/* Screen content */}
          <mesh position={[0, 0, 0.05]} rotation={[0, 0, 0]}>
            <planeGeometry args={[1.8, 1.1]} />
            <meshBasicMaterial color="#0a192f" />
            
            <Html
              transform
              occlude
              position={[0, 0, 0.01]}
              rotation={[0, 0, 0]}
              scale={[0.17, 0.17, 0.17]}
              style={{
                width: '1000px',
                height: '600px',
                backgroundColor: '#0a192f',
                borderRadius: '4px',
                padding: '12px',
              }}
            >
              <div className="w-full h-full flex flex-col items-center overflow-hidden">
                <h3 className="text-xl font-bold text-lightest-gray mb-2">{title}</h3>
                <div className="relative w-full h-full">
                  <img 
                    src={imageUrl} 
                    alt={title}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end justify-center pb-4">
                    <a 
                      href={projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-secondary text-primary rounded-md font-bold hover:bg-secondary/80 transition-colors duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            </Html>
          </mesh>
        </group>
        
        {/* Keyboard */}
        <mesh position={[0, 0.05, 0.3]} castShadow receiveShadow>
          <planeGeometry args={[1.8, 1.3]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        
        {/* Trackpad */}
        <mesh position={[0, 0.06, 0.6]} castShadow receiveShadow>
          <planeGeometry args={[0.8, 0.5]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
    </group>
  );
};

export default ProjectLaptop; 