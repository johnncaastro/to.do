import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { auth } from '../services/firebase'
import { api } from '../services/api'
import { useNavigate } from 'react-router'

interface User {
  email: string | null
  name: string | null
  avatar: string | null
}

interface AuthProviderProps {
  children: ReactNode
}

interface AuthContextData {
  user: User | undefined
  signInWithGoogle(): void
  signOutProvider(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()

  const googleProvider = new GoogleAuthProvider()

  const navigate = useNavigate()

  useEffect(() => {
    const recoverSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, photoURL } = user

        if (!photoURL) {
          throw new Error('Missing photo from provider account!')
        }

        setUser({
          email,
          name: displayName,
          avatar: photoURL,
        })

        navigate('/home')
      } else {
        navigate('/')
      }
    })

    return () => {
      recoverSubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function signInWithGoogle() {
    const result = await signInWithPopup(auth, googleProvider)

    const { displayName, email, photoURL } = result.user

    if (!photoURL) {
      throw new Error('Missing photo from provider account!')
    }

    setUser({
      email,
      name: displayName,
      avatar: photoURL,
    })

    await api.post('/users/sign-in', { displayName, email })

    navigate('/home')
  }

  async function signOutProvider() {
    await signOut(auth)

    setUser(undefined)

    navigate('/')
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutProvider }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
