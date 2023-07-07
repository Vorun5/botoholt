import { api } from 'shared/api';
import { Commands } from 'shared/types';

export const getCommands = async () => {
    const commands: Commands = [
        {
            function: 'bot.songs.songProcess',
            aliases: ['!s', '!song', '!песня'],
            cooldown: 10,
            enabled: true,
            answers: {
                daAnswers: {
                    success: {
                        answers: ['_userName это _songName (_mediaLink) peepoDJ заказ от _requestedBy'],
                        variables: ['_userName', '_songName', '_mediaLink', '_bholtLink', '_requestedBy'],
                    },
                },
                shazamAnswers: {
                    success: {
                        answers: ['_userName скорее всего это _songName VIBE'],
                        variables: ['_userName', '_songName', '_bholtLink'],
                    },
                    failure: {
                        answers: [
                            '_userName Не смог распознать, может Смурф что-то бубнил в этот момент? smurftvAllgood (попробуй ещё раз)',
                            '_userName Не знаю, может это шиттифлютед гачи говновоз? peepoDJ (или попробуй ещё раз)',
                            '_userName Кажется это всетаки Rick Astley - Never Gonna Give You Up Agakakskagesh (или попробуй ещё раз)',
                            '_userName Darude - Sandstorm, конечно bttvPizdabolich (или попробуй ещё раз)',
                            '_userName Ало, не расслышал gachiPhone (попробуй ещё раз)',
                            '_userName это тишина smurftvDy6uHa (или попробуй ещё раз)',
                            '_userName чат ,а че со звуком? у меня почему-то поперек музыки какой-то гигачад говорит GIGACHAD (попробуй ещё раз)',
                            '_userName можно потише, я шазамлю Wankge (попробуй ещё раз)',
                            '_userName Ребят, а у вас тоже какая-то свинка хрюкает на фоне сейчас? KEKWait Вот хрю хрю, хрю хрю peepoShy (попробуй ещё раз)',
                        ],
                        variables: ['_userName', '_bholtLink'],
                    },
                },
            },
        },
        {
            function: 'bot.songs.whichProcess',
            aliases: ['!который', '!which'],
            cooldown: 10,
            enabled: true,
            answers: {
                daAnswers: {
                    success: {
                        answers: ['_userName места песен в очереди: _songsInQueue Подробнее: _bholtLink'],
                        variables: ['_userName', '_bholtLink', '_songsInQueue', '_timeToNearestSong'],
                    },
                    failure: {
                        answers: [
                            '_userName не могу найти песен в очереди Sadge но возможно они есть там BOOBA _bholtLink',
                        ],
                        variables: ['_userName', '_bholtLink'],
                    },
                },
            },
        },
        {
            function: 'bot.songs.queueProcess',
            aliases: ['!q', '!queue', '!очередь'],
            cooldown: 10,
            enabled: true,
            answers: {
                daAnswers: {
                    success: {
                        answers: [
                            '_userName песен в очереди _queueLength pugPls будут играть ещё ~_queueDuration Подробнее: _bholtLink pepeEvil',
                        ],
                        variables: ['_userName', '_bholtLink', '_songsInQueue', '_queueLength', '_queueDuration'],
                    },
                    failure: {
                        answers: ['_userName кажется, сейчас играют не заказные треки PepoThink'],
                        variables: ['_userName', '_bholtLink'],
                    },
                },
            },
        },
        {
            function: 'bot.songs.lastSong',
            aliases: ['!last', '!последний'],
            cooldown: 10,
            enabled: true,
            answers: {
                daAnswers: {
                    success: {
                        answers: ['_userName перед этим играла _lastSong, вся история на _bholtLink'],
                        variables: ['_userName', '_lastSong', '_bholtLink'],
                    },
                },
                shazamAnswers: {
                    success: {
                        answers: ['_userName последняя опознанная песня была _lastSong kumaPls'],
                        variables: ['_userName', '_songName', '_bholtLink'],
                    },
                    failure: {
                        answers: ['_userName я не знаю PoroSad'],
                        variables: ['_userName', '_bholtLink'],
                    },
                },
            },
        },
    ]
    await new Promise(resolve => setTimeout(resolve, 2000));
    return commands

    const response = await api.get('admin/commands').json<Commands>()

    return response
}
