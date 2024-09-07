import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { SocketProvider } from './socket/SocketContext';
import { useWatchman, WatchmanProvider } from './watchman/WatchmanContext';
import { Alert, AspectRatio, Avatar, Box, Card, Divider, Grid, Typography } from '@mui/joy';
import { CalendarMonthOutlined, Check, Close, TimerOutlined, WarningOutlined } from '@mui/icons-material';
import dayjs from 'dayjs';
import fondo1 from "./assets/fondo1.jpg"
import { Howl } from 'howler';
import soundFile from './assets/notify.mp3'

const WatchmanApp = () => {
  const sound = new Howl({
    src: [soundFile],
    autoplay: false,
    volume: 1.0,
  });
  const { identifiedMember, daysDifference } = useWatchman()

  useEffect(() => {
    if (identifiedMember != null && daysDifference != null && daysDifference <= 0) {
      sound.play();
    }
  }, [daysDifference, identifiedMember, sound])

  return <Box paddingX={8} paddingY={4} position='relative'>
    <Box position='absolute' left={0} top={0} width='100vw' height='100vh' overflow='hidden' zIndex={-100}>
      <AspectRatio ratio="16/10.7" objectFit='cover'>
        <img src={fondo1} />
      </AspectRatio>
    </Box>
    <Box position='absolute' left={0} top={0} width='100vw' height='100vh' overflow='hidden' zIndex={-99} bgcolor='black' style={{ opacity: .5 }}>
    </Box>
    <Box>
      <Typography level="h1" style={{ color: 'white' }}>Mi Socio</Typography>
    </Box>
    {
      daysDifference != null && daysDifference <= 0 && (
        <Grid container rowSpacing={0} marginBottom={2}>
          <Grid xs={8} xsOffset={2}>
            <Alert
              size='lg'
              color='danger'
              startDecorator={<WarningOutlined />}
              style={{ fontSize: '25px' }}
            >
              Tu suscripción vencio el dia {dayjs(identifiedMember!.subscriptions![0].dateTo).format('DD/MM/YYYY')}
            </Alert>
          </Grid>
        </Grid> 
      )
    }

    {
      daysDifference != null && daysDifference > 0 && daysDifference <= 3 && (
        <Grid container rowSpacing={0} marginBottom={2}>
          <Grid xs={8} xsOffset={2}>
            <Alert
              size='lg'
              color='warning'
              startDecorator={<WarningOutlined />}
              style={{ fontSize: '25px' }}
            >
              Tu suscripción vence en {daysDifference} {daysDifference > 1 ? 'días' : 'día'}
            </Alert>
          </Grid>
        </Grid> 
      )
    }

    {identifiedMember !== null && (
    <Grid container spacing={2}>
      <Grid xs={8} xsOffset={2}>
        <Card
          variant='soft'
          sx={{ p: 2, display: 'flex', flexDirection: 'column', rowGap: 1 }}
        >
          <Box display='flex' flexDirection='row'>
            {
              daysDifference != null && daysDifference > 0 && (
                <Check style={{ fontSize: '100px' }} color='success' />
              )
            }
            {
              daysDifference != null && daysDifference <= 0 && (
                <Close color='error' style={{ fontSize: '100px' }} />
              )
            }
            <Box>
              <Typography color='success' level='h1'>Bienvenido de nuevo</Typography>
              <Typography level='h2'>
                {identifiedMember?.fullName ?? "N/A"}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box display='flex' flexDirection='column'>
            <Box display='flex' columnGap={2}>
              <Avatar color='primary' size='lg'>
                <CalendarMonthOutlined />
              </Avatar>
              <Box display='flex' flexDirection='column'>
                <Typography level='h2' fontWeight='bold'>Inicio de suscripción</Typography>
                <Typography level='h2' fontWeight='bold'>
                  {
                    !!identifiedMember?.subscriptions
                      ? dayjs(identifiedMember.subscriptions[0].dateFrom).format('DD/MM/YYYY')
                      : 'N/A'
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box display='flex' flexDirection='column'>
            <Box display='flex' columnGap={2}>
              <Avatar color='danger' size='lg'>
                <TimerOutlined />
              </Avatar>
              <Box display='flex' flexDirection='column'>
                <Typography level='h2' fontWeight='bold'>Fin de suscripción</Typography>
                <Typography level='h2' fontWeight='bold'>
                  {
                    !!identifiedMember?.subscriptions
                      ? dayjs(identifiedMember.subscriptions[0].dateTo).format('DD/MM/YYYY')
                      : 'N/A'
                  }
                </Typography>
              </Box>
            </Box>
          </Box>
        </Card>
      </Grid>
    </Grid>
    )}
  </Box>
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SocketProvider>
        <WatchmanProvider>
          <WatchmanApp />
        </WatchmanProvider>
      </SocketProvider>
    </LocalizationProvider>
  </React.StrictMode>
);
