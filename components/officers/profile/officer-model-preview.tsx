import type * as React from 'react';
import Lanyard from '@/components/ui/lanyard';

type OfficerModelPreviewProps = {
  modelUrl: string;
};

const OfficerModelPreview: React.FC<OfficerModelPreviewProps> = ({
  modelUrl,
}) => (
  <div className="relative h-[50vh] md:h-[58vh] overflow-hidden rounded-3xl border border-white/20 bg-black/15">
    <div className="absolute bottom-65 w-full h-full">
      <Lanyard modelUrl={modelUrl} position={[0, 0.1, 8]} fov={40} />
    </div>
  </div>
);

export default OfficerModelPreview;
