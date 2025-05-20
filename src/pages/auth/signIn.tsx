/* eslint-disable import/no-absolute-path */
import heroImg from '/hero-sign-in.svg'
import googleIcon from '/google.png'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router'

export function SignIn() {
  const { signInWithGoogle, user } = useAuth()

  const navigate = useNavigate()

  function handleSignInWithGoogle() {
    if (!user) {
      signInWithGoogle()
    } else {
      navigate('/home')
    }
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="flex-1 laptop:flex flex-col items-center justify-center gap-12 bg-blue-300 px-2 mobile:hidden">
        <h1 className="uppercase text-blue-700 font-bold text-4xl">to do</h1>
        <img
          src={heroImg}
          alt="garota ao lado de um enorme papel com uma lista de tarefas"
          className="desktop:max-w-xl laptop-large:max-w-md"
        />
        <p className="text-white text-lg text-center">
          Gerencie suas tarefas com facilidade. Simples, rápido e eficaz.
        </p>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-2 bg-gray-100">
        <h1 className="text-3xl font-semibold">Bem vindo!</h1>
        <button
          type="button"
          onClick={handleSignInWithGoogle}
          className="w-48 flex items-center gap-4 border border-black rounded-md px-2 py-2 text-sm hover:bg-blue-100 transition-colors duration-200"
        >
          <img src={googleIcon} alt="Ícone do google" className="w-5 h-5" />
          Login com Google
        </button>
        {/* <button
          type="button"
          className="w-48 flex items-center gap-4 border border-black rounded-md px-2 py-2 text-sm hover:bg-blue-100 transition-colors duration-200"
        >
          <img src={githubIcon} alt="Ícone do github" className="w-5 h-5" />
          Login com Github
        </button> */}
      </div>
    </div>
  )
}
