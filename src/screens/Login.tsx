import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import coinsBg from '../assets/coins_bg.png'
import BuburuzaLogoMark from '../assets/buburuza-logo-mark.svg?react'

export default function Login() {
  const { isAuthed, login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthed) {
    return <Navigate to="/" replace />
  }

  const canSubmit = username.trim() !== '' && password.trim() !== ''

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (login(username, password)) {
      navigate('/')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="bg-gradient-elevated min-h-screen w-full relative flex flex-col">
      {/* Background coins illustration */}
      <img
        src={coinsBg}
        alt=""
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"
        style={{ width: 1334, height: 1777 }}
      />

      {/* Content */}
      <div className="flex flex-col flex-1 px-xl pt-xl pb-5xl relative">
        {/* Logo */}
        <div className="shrink-0">
          <BuburuzaLogoMark width={32} height={32} />
        </div>

        {/* Centered card */}
        <div className="flex-1 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-background-neutral border border-border-base rounded-m p-xl w-[450px] flex flex-col gap-xl"
          >
            <h1 className="text-heading-m font-medium text-foreground-primary">
              Welcome Back!
            </h1>

            <div className="flex flex-col gap-xs">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {error && (
                <p className="text-body-s text-foreground-error">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="default"
              disabled={!canSubmit}
              className="w-full"
            >
              Next
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
