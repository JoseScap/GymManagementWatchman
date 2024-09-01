import ReactDOM from 'react-dom/client'
import { useWatchman } from './watchman/WatchmanContext.tsx'
import { SocketProvider } from './socket/SocketContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  const { identifiedMember, daysDifference } = useWatchman()

const handleSwitchScreens = () => {
  window.electron.ipcRenderer.send('switch-screens');
};

return (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <SocketProvider>
      <WatchmanProvider>
        <Watchman />
      </WatchmanProvider>
    </SocketProvider>
  </LocalizationProvider>
)
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
