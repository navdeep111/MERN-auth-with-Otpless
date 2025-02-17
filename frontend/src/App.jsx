
import { Route, Routes } from 'react-router'

import './App.css'
import LoginStep1 from './pages/LoginStep1.jsx'
import SignupStep1 from './pages/SignupStep1.jsx'



function App() {
	return (
		<Routes>
			<Route path='/' element={<LoginStep1 />} />
			<Route path='/' element={<SignupStep1 />} />
		</Routes>
	)
}

export default App
