import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Box } from '@mui/material';

function GlassesModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={1.2} />;
}

const ThreeDProductViewer = ({ modelPath }) => {
  return (
    <Box
      sx={{
        height: 400,
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <GlassesModel modelPath={modelPath} />
          <Environment preset="studio" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>
    </Box>
  );
};

export default ThreeDProductViewer;
