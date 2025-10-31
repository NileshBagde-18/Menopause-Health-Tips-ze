import { TrendingUp, Users, Star } from "lucide-react"

export function StatisticsMockup() {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-emerald-100">
        <div className="mb-6">
          <div className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent mb-2">
            85%
          </div>
          <p className="text-gray-600 text-sm font-medium">users feel less anxious</p>
        </div>

        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <span>2,847 users</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            <span>6-month study</span>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-gray-600">4.9/5 rating</span>
          </div>
        </div>
      </div>
    </div>
  )
}
