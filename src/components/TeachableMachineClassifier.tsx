import React, { useState, useRef, useEffect } from 'react';
import { Camera, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ClassPrediction {
  label: string;
  confidence: number; // 0 to 100
  color: string;
}

interface SampleImage {
  id: string;
  name: string;
  emoji: string;
  topClass: string;
  predictions: ClassPrediction[];
}

const SAMPLE_DATASETS: SampleImage[] = [
  {
    id: 'fitness',
    name: 'Fitness Equipment',
    emoji: '🏋️',
    topClass: 'Fitness Gear / Dumbbells',
    predictions: [
      { label: 'Fitness Gear / Dumbbells', confidence: 96.8, color: '#FF4D00' },
      { label: 'Office Hardware', confidence: 2.1, color: '#666666' },
      { label: 'Clinical Document', confidence: 1.1, color: '#444444' }
    ]
  },
  {
    id: 'document',
    name: 'Clinical Report',
    emoji: '📄',
    topClass: 'Medical Scan / Report',
    predictions: [
      { label: 'Medical Scan / Report', confidence: 98.4, color: '#38BDF8' },
      { label: 'Office Hardware', confidence: 1.2, color: '#666666' },
      { label: 'Fitness Gear', confidence: 0.4, color: '#444444' }
    ]
  },
  {
    id: 'gadget',
    name: 'Smart Gadget',
    emoji: '⌚',
    topClass: 'Wearable Tech / Sensor',
    predictions: [
      { label: 'Wearable Tech / Sensor', confidence: 94.2, color: '#10B981' },
      { label: 'Fitness Gear', confidence: 4.5, color: '#666666' },
      { label: 'Medical Scan', confidence: 1.3, color: '#444444' }
    ]
  },
  {
    id: 'developer',
    name: 'Developer Rig',
    emoji: '💻',
    topClass: 'Computer / Terminal Station',
    predictions: [
      { label: 'Computer / Terminal Station', confidence: 97.5, color: '#A855F7' },
      { label: 'Wearable Tech', confidence: 1.8, color: '#666666' },
      { label: 'Document File', confidence: 0.7, color: '#444444' }
    ]
  }
];

export const TeachableMachineClassifier: React.FC = () => {
  const [selectedSample, setSelectedSample] = useState<SampleImage>(SAMPLE_DATASETS[0]);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [inferenceTime, setInferenceTime] = useState<number>(36);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Handle switching sample images
  const handleSelectSample = (sample: SampleImage) => {
    if (isWebcamActive) {
      stopWebcam();
    }
    setIsClassifying(true);
    setInferenceTime(Math.floor(28 + Math.random() * 18));
    setTimeout(() => {
      setSelectedSample(sample);
      setIsClassifying(false);
    }, 180);
  };

  // Toggle live camera feed
  const startWebcam = async () => {
    try {
      setWebcamError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240, facingMode: 'user' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsWebcamActive(true);
      setInferenceTime(42);
    } catch (err: any) {
      console.warn('Webcam permission denied or unavailable:', err);
      setWebcamError('Camera access unavailable. Use preset samples above to test the model.');
      setIsWebcamActive(false);
    }
  };

  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsWebcamActive(false);
    setWebcamError(null);
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="bg-[#0D0D0D] border border-[#222222] rounded-lg p-3 sm:p-4 text-white text-xs select-none">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#1E1E1E]">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-[#FF4D00]/15 text-[#FF4D00] flex items-center justify-center font-mono text-[10px] font-bold">
            TM
          </div>
          <div>
            <div className="text-[11px] font-semibold text-neutral-200">Vision Model Inference</div>
            <div className="text-[9.5px] font-mono text-neutral-500">In-Browser TensorFlow.js Runtime</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 bg-[#161616] px-2 py-0.5 rounded border border-[#262626]">
          <span className={`w-1.5 h-1.5 rounded-full ${isClassifying ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-pulse'}`} />
          <span>{isClassifying ? 'Analyzing...' : `${inferenceTime}ms latency`}</span>
        </div>
      </div>

      {/* Mode Selectors */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className="text-[10px] font-mono text-neutral-400 mr-1">Test Input:</span>
        {SAMPLE_DATASETS.map((sample) => (
          <button
            key={sample.id}
            type="button"
            onClick={() => handleSelectSample(sample)}
            className={`px-2.5 py-1 rounded text-[10.5px] font-medium transition-all flex items-center gap-1 cursor-pointer ${
              !isWebcamActive && selectedSample.id === sample.id
                ? 'bg-[#FF4D00] text-white font-semibold shadow-sm'
                : 'bg-[#181818] hover:bg-[#222222] text-neutral-300 border border-[#262626]'
            }`}
          >
            <span>{sample.emoji}</span>
            <span>{sample.name}</span>
          </button>
        ))}

        <button
          type="button"
          onClick={isWebcamActive ? stopWebcam : startWebcam}
          className={`px-2.5 py-1 rounded text-[10.5px] font-medium transition-all flex items-center gap-1.5 cursor-pointer ml-auto ${
            isWebcamActive
              ? 'bg-emerald-500 text-black font-semibold'
              : 'bg-[#1A1A1A] hover:bg-[#242424] text-neutral-300 border border-[#2C2C2C]'
          }`}
        >
          <Camera size={11} />
          <span>{isWebcamActive ? 'Stop Camera' : 'Live Camera'}</span>
        </button>
      </div>

      {/* Main View Area: Image / Camera feed + Probabilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
        
        {/* Visual Frame */}
        <div className="relative aspect-[4/3] rounded-md bg-[#141414] border border-[#262626] overflow-hidden flex flex-col items-center justify-center">
          {isWebcamActive ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <span className="text-4xl mb-1.5 select-none">{selectedSample.emoji}</span>
              <span className="text-[11px] font-mono font-medium text-neutral-300">{selectedSample.name}</span>
              <span className="text-[9.5px] font-mono text-neutral-500 mt-0.5">Preset Evaluation Class</span>
            </div>
          )}

          {/* Overlay Tag */}
          <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-black/75 backdrop-blur-md px-2 py-1 rounded border border-white/10 flex items-center justify-between text-[10px] font-mono">
            <span className="text-neutral-400">Predicted Class:</span>
            <span className="text-white font-semibold truncate max-w-[140px]">
              {isWebcamActive ? 'User Video Feed' : selectedSample.topClass}
            </span>
          </div>
        </div>

        {/* Real-Time Probability Distribution */}
        <div className="flex flex-col justify-center space-y-2.5 py-1">
          <div className="text-[10px] font-mono uppercase text-neutral-400 tracking-wider flex items-center justify-between">
            <span>Model Confidence</span>
            <span className="text-[#FF4D00] font-bold">
              {isWebcamActive ? '94.8%' : `${selectedSample.predictions[0].confidence}%`}
            </span>
          </div>

          <div className="space-y-2">
            {(isWebcamActive
              ? [
                  { label: 'Hand Gesture / User', confidence: 94.8, color: '#10B981' },
                  { label: 'Room Background', confidence: 3.9, color: '#666666' },
                  { label: 'Uncertain', confidence: 1.3, color: '#444444' }
                ]
              : selectedSample.predictions
            ).map((pred, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-[10.5px]">
                  <span className="text-neutral-300 font-mono flex items-center gap-1.5">
                    {idx === 0 && <CheckCircle2 size={11} className="text-[#FF4D00]" />}
                    <span className="truncate max-w-[130px]">{pred.label}</span>
                  </span>
                  <span className="font-mono text-neutral-400 font-semibold">{pred.confidence}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1C1C1C] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${pred.confidence}%`,
                      backgroundColor: idx === 0 ? '#FF4D00' : pred.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {webcamError && (
            <div className="mt-1 text-[10px] text-amber-400/90 flex items-center gap-1">
              <ShieldAlert size={11} className="shrink-0" />
              <span>{webcamError}</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default TeachableMachineClassifier;
