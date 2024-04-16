import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type DayDate = {
    date: Date;
}

function buildDayDates(): DayDate[] {
    const daysOfWeek = 6; // Sunday -> Saturday: Sunday = 0, Saturday = 6
    const currentDate: Date = new Date();
    const currentDay: number = currentDate.getDay();
    
    let dayDates: DayDate[] = [];
    
    for (let i = 0; i < daysOfWeek; i++) {
        const date = new Date(currentDate);
        const dayDiff = i - currentDay;
        
        if (dayDiff !== 0) {
            date.setDate(currentDate.getDate() + dayDiff);
        }

        dayDates = [...dayDates, { date }];
    }
    
    return dayDates;
}

const dayDates = buildDayDates();


async function main() {
    const tasks = await prisma.task.createMany({
        data: [
            // Sunday
            {
                title: 'Work Period',
                duration: '10AM - 3PM',
                startTime: 1000,
                endTime: 1500,
                date: dayDates[0].date
            },
            {
                title: 'Work Period',
                duration: '8PM - 10:30PM',
                startTime: 2000,
                endTime: 2230,
                date: dayDates[0].date
            },
            // Sunday End
            // Monday
            {
                title: 'Work Period',
                duration: '9AM - 1PM',
                startTime: 900,
                endTime: 1300,
                date: dayDates[1].date
            },
            {
                title: 'Lunch',
                duration: '1PM - 1:30PM',
                startTime: 1300,
                endTime: 1330,
                date: dayDates[1].date
            },
            {
                title: 'Meeting',
                duration: '1:30PM - 2:00PM',
                startTime: 1330,
                endTime: 1400,
                date: dayDates[1].date
            },
            {
                title: 'Work Period',
                duration: '2PM - 5PM',
                startTime: 1400,
                endTime: 1700,
                date: dayDates[1].date
            },
            // Monday End
            // Tuesday
            {
                title: 'Stand Up - Meeting',
                duration: '9:00AM - 9:15AM',
                startTime: 900,
                endTime: 915,
                date: dayDates[2].date
            },
            {
                title: 'Work Period',
                duration: '9:15AM - 1PM',
                startTime: 915,
                endTime: 1300,
                date: dayDates[2].date
            },
            {
                title: 'Lunch',
                duration: '1PM - 1:30PM',
                startTime: 1300,
                endTime: 1330,
                date: dayDates[2].date
            },
            {
                title: 'Work Period',
                duration: '1:30PM - 5PM',
                startTime: 1330,
                endTime: 1700,
                date: dayDates[2].date
            },
            // Tuesday End
            // Wednesday
            {
                title: 'Stand Up - Meeting',
                duration: '9:00AM - 9:15AM',
                startTime: 900,
                endTime: 915,
                date: dayDates[3].date
            },
            {
                title: 'Work Period',
                duration: '9:15AM - 1PM',
                startTime: 915,
                endTime: 1300,
                date: dayDates[3].date
            },
            {
                title: 'Lunch',
                duration: '1PM - 1:30PM',
                startTime: 1300,
                endTime: 1330,
                date: dayDates[3].date
            },
            {
                title: 'Work Period',
                duration: '1:30PM - 5PM',
                startTime: 1330,
                endTime: 1700,
                date: dayDates[3].date
            },
            // Wednesday End
            // Thursday
            {
                title: 'Stand Up - Meeting',
                duration: '9:00AM - 9:15AM',
                startTime: 900,
                endTime: 915,
                date: dayDates[4].date
            },
            {
                title: 'Work Period',
                duration: '9:15AM - 1PM',
                startTime: 915,
                endTime: 1300,
                date: dayDates[4].date
            },
            {
                title: 'Lunch',
                duration: '1PM - 1:30PM',
                startTime: 1300,
                endTime: 1330,
                date: dayDates[4].date
            },
            {
                title: 'Work Period',
                duration: '1:30PM - 5PM',
                startTime: 1330,
                endTime: 1700,
                date: dayDates[4].date
            },
            // Thursday End
            // Friday
            {
                title: 'Stand Up - Meeting',
                duration: '9:00AM - 9:15AM',
                startTime: 900,
                endTime: 915,
                date: dayDates[5].date
            },
            {
                title: 'Work Period',
                duration: '9:15AM - 1PM',
                startTime: 915,
                endTime: 1300,
                date: dayDates[5].date
            },
            {
                title: 'Lunch',
                duration: '1PM - 1:30PM',
                startTime: 1300,
                endTime: 1330,
                date: dayDates[5].date
            },
            {
                title: 'Work Period',
                duration: '1:30PM - 5PM',
                startTime: 1330,
                endTime: 1700,
                date: dayDates[5].date
            },
            // Friday End
            // Saturday
            {
                title: 'Work Period',
                duration: '1:30PM - 5PM',
                startTime: 1330,
                endTime: 1700,
                date: dayDates[6].date
            },
            // Saturday End
        ]
    });
    console.log({ tasks });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })