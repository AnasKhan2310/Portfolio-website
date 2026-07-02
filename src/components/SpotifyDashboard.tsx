import { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  ArrowUpDown, 
  Globe, 
  Smartphone, 
  Play, 
  Pause, 
  TrendingUp, 
  Headphones, 
  Sparkles, 
  Volume2, 
  Share2, 
  Database,
  Grid
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface SpotifyDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

// Highly detailed mock datasets based on realistic Spotify Web API analysis
const streamHistoryData = [
  { name: 'Jan', streams: 1200000, listeners: 450000, saves: 85000 },
  { name: 'Feb', streams: 1850000, listeners: 520000, saves: 110000 },
  { name: 'Mar', streams: 2400000, listeners: 680000, saves: 145000 },
  { name: 'Apr', streams: 2200000, listeners: 610000, saves: 130000 },
  { name: 'May', streams: 3100000, listeners: 890000, saves: 198000 },
  { name: 'Jun', streams: 4500000, listeners: 1200000, saves: 280000 },
  { name: 'Jul', streams: 4800000, listeners: 1350000, saves: 310000 },
  { name: 'Aug', streams: 4200000, listeners: 1100000, saves: 260000 },
  { name: 'Sep', streams: 3900000, listeners: 980000, saves: 220000 },
  { name: 'Oct', streams: 5400000, listeners: 1550000, saves: 340000 },
  { name: 'Nov', streams: 6100000, listeners: 1800000, saves: 395000 },
  { name: 'Dec', streams: 7800000, listeners: 2400000, saves: 512000 }
];

const demographicData = [
  { name: 'United States', value: 38, color: '#1DB954' },
  { name: 'United Kingdom', value: 18, color: '#1ed760' },
  { name: 'Germany', value: 14, color: '#2cdb6d' },
  { name: 'Pakistan', value: 12, color: '#40e27c' },
  { name: 'Brazil', value: 10, color: '#5de890' },
  { name: 'Others', value: 8, color: '#83f0ac' }
];

const deviceData = [
  { name: 'Mobile', percentage: 72, icon: Smartphone },
  { name: 'Desktop/Web', percentage: 18, icon: Grid },
  { name: 'Smart Speakers', percentage: 7, icon: Volume2 },
  { name: 'TV & Gaming Console', percentage: 3, icon: Share2 }
];

// Audio features analysis for Spotify tracks (Danceability, Energy, Valence, Acousticness, Speechiness)
const audioFeaturesData = [
  { subject: 'Danceability', A: 78, B: 65, fullMark: 100 },
  { subject: 'Energy', A: 85, B: 72, fullMark: 100 },
  { subject: 'Valence (Happiness)', A: 62, B: 55, fullMark: 100 },
  { subject: 'Acousticness', A: 15, B: 38, fullMark: 100 },
  { subject: 'Speechiness', A: 28, B: 12, fullMark: 100 },
  { subject: 'Liveness', A: 22, B: 18, fullMark: 100 }
];

const trackPerformanceData = [
  { id: 1, title: "Nine Is God", streams: "15,581,029", monthly: "1,240,500", energy: 85, danceability: 78, status: "Trending Up", rating: 94 },
  { id: 2, title: "Green Eyes", streams: "14,301,707", monthly: "980,200", energy: 72, danceability: 65, status: "Stable", rating: 88 },
  { id: 3, title: "King of the Beach", streams: "11,920,399", monthly: "820,100", energy: 91, danceability: 82, status: "Trending Up", rating: 91 },
  { id: 4, title: "My Head Hurts", streams: "9,532,045", monthly: "640,000", energy: 78, danceability: 69, status: "Slight Drop", rating: 82 },
  { id: 5, title: "Tarantula", streams: "2,892,362", monthly: "310,400", energy: 94, danceability: 58, status: "Stable", rating: 79 },
  { id: 6, title: "Hideaway", streams: "1,004,500", monthly: "150,000", energy: 65, danceability: 73, status: "New Release", rating: 85 }
];

export default function SpotifyDashboard({ isOpen, onClose }: SpotifyDashboardProps) {
  const [activeMetric, setActiveMetric] = useState<'streams' | 'listeners' | 'saves'>('streams');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'streams' | 'monthly' | 'rating'>('streams');
  const [sortAscending, setSortAscending] = useState(false);
  const [isPlaying, setIsPlaying] = useState<number | null>(null);
  const [liveStreamCounter, setLiveStreamCounter] = useState(54231842);

  // Live simulation of stream increments
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setLiveStreamCounter(prev => prev + Math.floor(Math.random() * 4) + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Sorting track list helper
  const parseNumber = (val: string) => parseInt(val.replace(/,/g, ''));

  const sortedTracks = [...trackPerformanceData]
    .filter(track => track.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      let aVal = 0;
      let bVal = 0;
      if (sortField === 'streams') {
        aVal = parseNumber(a.streams);
        bVal = parseNumber(b.streams);
      } else if (sortField === 'monthly') {
        aVal = parseNumber(a.monthly);
        bVal = parseNumber(b.monthly);
      } else if (sortField === 'rating') {
        aVal = a.rating;
        bVal = b.rating;
      }
      return sortAscending ? aVal - bVal : bVal - aVal;
    });

  const toggleSort = (field: 'streams' | 'monthly' | 'rating') => {
    if (sortField === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortField(field);
      setSortAscending(false);
    }
  };

  const getMetricColor = () => {
    switch(activeMetric) {
      case 'streams': return '#1DB954';
      case 'listeners': return '#1ed760';
      case 'saves': return '#38bdf8';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/90 backdrop-blur-md overflow-y-auto p-0 md:p-6 font-sans">
      
      {/* Main Container */}
      <div 
        className="relative bg-[#0d0d0f] text-neutral-200 w-full max-w-7xl md:rounded-3xl border border-neutral-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex flex-col h-full md:h-[90vh] overflow-hidden"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800 bg-[#111114] select-none shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[#1DB954] flex items-center justify-center text-neutral-950">
              <Database size={18} className="stroke-[2.5]" />
            </div>
            <div>
              <h2 className="text-sm font-black font-mono text-[#1DB954] uppercase tracking-widest leading-none">CONSUMER BEHAVIOR ANALYSIS</h2>
              <h1 className="text-lg font-bold text-white tracking-tight mt-1">Spotify Analytics Dashboard</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-full text-[11px] font-bold text-neutral-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
              Live Pipeline Connected
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-all cursor-pointer"
              title="Close Panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Dashboard Content - Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0a0c]">
          
          {/* Telemetry Row - Key Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Metric 1 */}
            <div className="bg-[#121215] border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-black">TOTAL PIPELINE STREAMS</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-mono mt-2 tracking-tight">
                  {liveStreamCounter.toLocaleString()}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-500 font-bold mt-4 font-mono">
                <TrendingUp size={14} />
                <span>+14.8% This Month</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#121215] border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-black">MONTHLY ACTIVE LISTENERS</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-mono mt-2 tracking-tight">
                  2,401,900
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-500 font-bold mt-4 font-mono">
                <Globe size={14} />
                <span>Global Audience Reach</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#121215] border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-black">TOTAL SAVES & LIKES</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-mono mt-2 tracking-tight">
                  1,854,200
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-500 font-bold mt-4 font-mono">
                <Sparkles size={14} />
                <span>77.2% Saving Ratio</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="bg-[#121215] border border-neutral-800 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-black">AVERAGE DANCEABILITY</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-mono mt-2 tracking-tight">
                  74.5%
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs text-sky-400 font-bold mt-4 font-mono">
                <Headphones size={14} />
                <span>Highly Energetic Profile</span>
              </div>
            </div>

          </div>

          {/* Primary Trend Chart + Demographics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Interactive Recharts Graph Panel */}
            <div className="lg:col-span-8 bg-[#121215] border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between min-h-[380px]">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 select-none">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Streaming Trend Analysis</h3>
                  <p className="text-xs text-neutral-500 mt-1">Click metrics to toggle visualization dataset</p>
                </div>

                <div className="flex items-center gap-1.5 bg-[#0a0a0c] border border-neutral-800 p-1 rounded-xl">
                  {(['streams', 'listeners', 'saves'] as const).map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setActiveMetric(metric)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                        activeMetric === metric 
                          ? 'bg-[#1DB954] text-neutral-950 font-bold' 
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {metric}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recharts Area Chart */}
              <div className="flex-1 w-full h-64 min-h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={streamHistoryData}
                    margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="metricGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={getMetricColor()} stopOpacity={0.2}/>
                        <stop offset="95%" stopColor={getMetricColor()} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      stroke="#4b5563" 
                      fontSize={10} 
                      fontFamily="monospace"
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#4b5563" 
                      fontSize={10} 
                      fontFamily="monospace"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => value >= 1000000 ? `${(value/1000000).toFixed(1)}M` : `${value/1000}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111114',
                        borderColor: '#262626',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                        color: '#f3f4f6'
                      }}
                      formatter={(value: any) => [value.toLocaleString(), activeMetric.toUpperCase()]}
                    />
                    <Area 
                      type="monotone" 
                      dataKey={activeMetric} 
                      stroke={getMetricColor()} 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#metricGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

            </div>

            {/* Demographics / Device distribution Panel */}
            <div className="lg:col-span-4 bg-[#121215] border border-neutral-800 rounded-2xl p-6 flex flex-col justify-between min-h-[380px]">
              
              <div>
                <h3 className="text-base font-bold text-white tracking-tight mb-5 select-none">Listener Demographics</h3>
                
                {/* Recharts Pie Chart representation */}
                <div className="h-40 w-full flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#111114',
                          borderColor: '#262626',
                          borderRadius: '10px',
                          fontSize: '10px',
                          color: '#f3f4f6'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute flex flex-col items-center justify-center pointer-events-none select-none">
                    <span className="text-[10px] font-mono text-neutral-500 font-bold uppercase">GLOBAL</span>
                    <span className="text-lg font-black text-white font-mono leading-none mt-1">100%</span>
                  </div>
                </div>

                {/* Country Breakdown Bars */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4">
                  {demographicData.map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-neutral-400 font-medium truncate">{item.name}</span>
                        <span className="text-white font-bold">{item.value}%</span>
                      </div>
                      <div className="h-1 bg-neutral-800 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Secondary Grid: Audio Features Radar Chart + Device Consumption */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Audio Profile Radar Chart */}
            <div className="bg-[#121215] border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between">
              
              <div className="mb-4 select-none">
                <h3 className="text-base font-bold text-white tracking-tight">Audio Features Signature</h3>
                <p className="text-xs text-neutral-500 mt-1">Acoustic fingerprinting of Muhammad Anas Khan's streaming list</p>
              </div>

              {/* Radar Graph */}
              <div className="h-64 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={audioFeaturesData}>
                    <PolarGrid stroke="#262626" />
                    <PolarAngleAxis dataKey="subject" stroke="#9ca3af" fontSize={10} fontFamily="sans-serif" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#4b5563" fontSize={8} />
                    <Radar name="Active Catalog" dataKey="A" stroke="#1DB954" fill="#1DB954" fillOpacity={0.2} />
                    <Radar name="Average Listener" dataKey="B" stroke="#38bdf8" fill="#38bdf8" fillOpacity={0.1} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#111114',
                        borderColor: '#262626',
                        borderRadius: '10px',
                        fontSize: '10px',
                        color: '#f3f4f6'
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center gap-6 mt-2 text-xs font-mono font-bold select-none">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-[#1DB954]/25 border border-[#1DB954] inline-block"></span>
                  <span className="text-neutral-300">My System Profile</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-[#38bdf8]/25 border border-[#38bdf8] inline-block"></span>
                  <span className="text-neutral-400">Standard Baseline</span>
                </div>
              </div>

            </div>

            {/* Device and User Flow stats */}
            <div className="bg-[#121215] border border-neutral-800 p-6 rounded-2xl flex flex-col justify-between">
              
              <div className="mb-6 select-none">
                <h3 className="text-base font-bold text-white tracking-tight">Playback Environment</h3>
                <p className="text-xs text-neutral-500 mt-1">How listeners consumed content via API channels</p>
              </div>

              <div className="space-y-5 flex-1 flex flex-col justify-center">
                {deviceData.map((item, idx) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center text-[#1DB954] shrink-0">
                        <IconComponent size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                          <span className="text-neutral-300 font-sans">{item.name}</span>
                          <span className="text-[#1DB954] font-mono">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
                          <div className="h-full bg-[#1DB954] rounded-full transition-all" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-neutral-800/60 pt-4 mt-6 flex items-center gap-3 text-xs text-neutral-500 font-mono">
                <Database size={14} className="text-neutral-500 shrink-0" />
                <span>Extracted directly via oauth flow telemetry.</span>
              </div>

            </div>

          </div>

          {/* Interactive Track Performance Table Panel */}
          <div className="bg-[#121215] border border-neutral-800 rounded-2xl overflow-hidden p-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
              <div>
                <h3 className="text-base font-bold text-white tracking-tight font-sans">Catalog Performance Metrics</h3>
                <p className="text-xs text-neutral-500 mt-1">Granular breakdown of track popularity and metrics</p>
              </div>

              {/* Search track */}
              <div className="relative">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input 
                  type="text" 
                  placeholder="Filter by song name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0a0a0c] border border-neutral-800 text-xs text-white rounded-xl pl-10 pr-4 py-2.5 w-full sm:w-56 focus:outline-none focus:border-[#1DB954] transition-colors"
                />
              </div>
            </div>

            {/* Track table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800/80 text-neutral-400 font-bold uppercase select-none">
                    <th className="py-3 px-3">Title</th>
                    <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort('streams')}>
                      <div className="flex items-center gap-1.5">
                        Streams <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort('monthly')}>
                      <div className="flex items-center gap-1.5">
                        Monthly Listeners <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-3 px-3">Energy</th>
                    <th className="py-3 px-3 cursor-pointer hover:text-white" onClick={() => toggleSort('rating')}>
                      <div className="flex items-center gap-1.5">
                        Popularity Index <ArrowUpDown size={12} />
                      </div>
                    </th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTracks.map((track) => (
                    <tr key={track.id} className="border-b border-neutral-850 hover:bg-neutral-900/40 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-white font-sans text-sm">{track.title}</td>
                      <td className="py-3.5 px-3 text-neutral-300 font-mono font-medium">{track.streams}</td>
                      <td className="py-3.5 px-3 text-neutral-400 font-mono">{track.monthly}</td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400 w-8">{track.energy}%</span>
                          <div className="w-16 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${track.energy}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#1DB954]">{track.rating}</span>
                          <span className="text-[9px] text-neutral-500">/ 100</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          track.status === 'Trending Up' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          track.status === 'Stable' ? 'bg-neutral-800 text-neutral-400 border border-neutral-700/50' :
                          track.status === 'New Release' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {track.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right">
                        <button 
                          onClick={() => setIsPlaying(isPlaying === track.id ? null : track.id)}
                          className={`h-8 w-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                            isPlaying === track.id 
                              ? 'bg-[#1DB954] text-neutral-950 border-transparent shadow-lg' 
                              : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          {isPlaying === track.id ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {sortedTracks.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-neutral-500 text-xs font-mono">
                        No tracks found matching your query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>

        {/* Action / Return Footer Bar */}
        <div className="bg-[#111114] border-t border-neutral-800 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-black font-mono bg-[#0a0a0c] text-neutral-400 border border-neutral-800 px-2 py-0.5 rounded tracking-wider uppercase">Verified Data Pipeline</span>
            <p className="text-[10px] text-neutral-500 font-bold font-mono uppercase tracking-tight">
              OAUTH AUTHORIZED · SYSTEM STATUS: OPERATIONAL
            </p>
          </div>
          <button
            onClick={onClose}
            className="bg-[#1DB954] hover:bg-[#1ed760] text-neutral-950 font-sans text-xs font-black uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 shadow-md cursor-pointer shrink-0"
          >
            Return to Portfolio
          </button>
        </div>

      </div>

    </div>
  );
}
