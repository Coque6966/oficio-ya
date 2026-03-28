"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

const data = [
  { name: "Lun", bookings: 12, revenue: 2400 },
  { name: "Mar", bookings: 19, revenue: 3800 },
  { name: "Mie", bookings: 15, revenue: 3000 },
  { name: "Jue", bookings: 22, revenue: 4400 },
  { name: "Vie", bookings: 30, revenue: 6000 },
  { name: "Sab", bookings: 25, revenue: 5000 },
  { name: "Dom", bookings: 10, revenue: 2000 },
];

export const AdminCharts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Reservas por Día</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] pb-6 px-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorBook" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px" }}
                itemStyle={{ color: "#3b82f6" }}
              />
              <Area type="monotone" dataKey="bookings" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBook)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/5 border-white/10 overflow-hidden">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-slate-400 uppercase tracking-wider">Ingresos Estimados (MXN)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] pb-6 px-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "8px" }}
                itemStyle={{ color: "#10b981" }}
              />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
