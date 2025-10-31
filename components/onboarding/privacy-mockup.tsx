import { Shield, Lock, EyeOff } from "lucide-react"

export function PrivacyMockup() {
  return (
    <div className="w-full bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center p-6 h-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-indigo-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Private Conversations</h3>
          <Shield className="w-5 h-5 text-indigo-500" />
        </div>

        {/* Chat Messages */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">M***</span>
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <p className="text-xs text-gray-500">••• ••••••• ••••••••</p>
              </div>
            </div>
            <EyeOff className="w-4 h-4 text-gray-400" />
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">S***</span>
            </div>
            <div className="flex-1">
              <div className="bg-white rounded-lg p-2 shadow-sm">
                <p className="text-xs text-gray-500">••••••• •••••••••••</p>
              </div>
            </div>
            <Lock className="w-4 h-4 text-indigo-500" />
          </div>
        </div>

        {/* Privacy Features */}
        <div className="bg-indigo-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-900">End-to-end encrypted</span>
          </div>
          <p className="text-xs text-indigo-700">Messages automatically deleted after 30 days</p>
        </div>
      </div>
    </div>
  )
}
