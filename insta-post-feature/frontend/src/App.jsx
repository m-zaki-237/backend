import {Route, Routes} from 'react-router-dom'
import CreatePost from './pages/CreatePost'
import Feed from './pages/Feed'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path='/create-post' element={<CreatePost/>}/>
          <Route path='/' element={<Feed/>}/>
        </Routes>
    </div>
  )
}

export default App