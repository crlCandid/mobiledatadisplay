//Constans used appliaction wide

module.exports = {
    MemoIndex : {
        UserSession : 'usersession',
        StationConfig: 'stationconfig'
    },
    SessionIndex: {
        Roles: {
            Edit: 'Edit',
            View: 'View',
            Remove: 'Remove',
            Display: 'Display',
            Admin: 'Admin',
        }
    },
    NavBar : {
        Pages : [
            {
                text: 'Main',
                route: '/app',
                admin: false
            },
            {
                text: 'Reports',
                route: '/app/reports',
                admin: false
            },
            {
                text: 'Areas',
                route: '/app/areas',
                admin: false
            },
            {
                text: 'Users',
                route: '/app/users',
                admin: true
            },
            {
                text: 'Tabs',
                route: '/app/tabs',
                admin: true
            },
        ]
    },
    Colors: {
        Primary:{
            Main: '#1976d2'
        },
        Secondary:{
            Main: '#dc004e',
        }
    },
    Report: {
        Kinds : ['Alert', 'NCR', 'Deviation'],
        Kind : {
            Alert:'Alert',
            Ncr:'NCR', 
            Deviation:'Deviation'
        },
        Status: ['Active', 'Disable'],
        Active: 'Active',
        Disable: 'Disable'
    },
    Area: {
        Status: ['Active', 'Disable'],
        Active: 'Active',
        Disable: 'Disable'
    },
    User: {
        Status: ['Active', 'Disable']
    },
    TabWiz: {
        Types: [
            {
                Name: 'PowerApps',
                Controller: {
                    icon: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAvwMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAAAQIDBAYHBQj/xAA8EAACAgECBAMCDQIFBQAAAAAAAQIDBAURBiExQRJRYSIyBxMjM0JSYnGRobHB0RQkQ1NygeEVNJPw8f/EABkBAQADAQEAAAAAAAAAAAAAAAABAgMFBP/EACERAAIDAAICAwEBAAAAAAAAAAABAgMRBBIhMSJBYROh/9oADAMBAAIRAxEAPwDuIAAAAAAAAAAABRZZCuLlZJRjFbtvokVN7HKvhC4u/rrbNJ02f9rB+G+yL+df1V9ld/MvXBzliNaaZWy6o3Snjbh2/LWLXqMfG3spOuSg3/q22/M2BTi1unyPnBpbHReA+MprFnp2oeO2dEN6bera7Rk/0Zvbx+q2J67+D0WwOhZuoY2DBSybPDv0SW7f+xRganiZzkse3xSXWLTTRo+bmXZuQ7r37T6JdEvIox77ce6N1MvDOPRop/LwFwvh+nR9yTztH1OrUcfxR2jZH34eX/B6KMWseHhlFxeMAAgqAAAAAAAAAAAAAAAAAAGQ20H0NL4+4t/6TQ8HAnH+utXtS/yY+f3+X4loRcniL11ysl1ief8ACJxf8Up6RplnyrW2TbF+59her7+RzPklyEpOTcpNycm22+r9RTXZkXQooj4rJvZI6VcFXE7tNUaodUV4uPdmZEaKI7zl+CXmzdtNwatPx/iqlu3znN9ZMt6RptenUeFe1bP35+fovQzjOctZbRuGyAUIL+HlW4eRG+iXhku3ZryZvel6jVqGOrK3tJcpx7xZzzuZOn51uBkq6nn2lF9JIpOHY83I46sWr2dGTJMXAzas7GjdS+TXNd0/IyjynIaaeMAAEAAAAAAAAAAAAApZO6PF4o4gxuH9PlkXbTtl7NNS6zl/HmyUm3iJjFyeIw+M+KKtAw/BVJTzrl8jXv0+0/T9TjF11uRdO++yVttkvFOyb3cm+5d1LPydTzrczMn47rXzfkuyXkkYx0aq1Bfp3ONQqV59kSeyNr4XxK6sCOVsnbdv7Xkk2tvyNSl067Hq8O6ysKaxMn/t5veM/wDLb/YtP0bSNxBHbffdPuDAqAQNyQGCNyOrBJnaVqVunZCnDd1t/KQ395fyb7h5VWXRG2ifihLozn2NjqW07On0UetpWa9Pt9mPyUvfiv1RhZFP0eHk0Kfyj7NzBbpthdXGdbTjJbpouGBywAAAAAAAAAQwY+oZtGn4luVl2KumqPilJ9kM0Ix9b1bF0bAtzMyajCC5LvN9kvU4dr2s5WuajPMy5Nb8q60+VcfJGVxZxHfxFqDtknXi1vair6q836v8jwzoU1dVr9nZ4vGVa7S9k7kbghm569D5lqyG6Zd3KWt0GiGj2+Gtb+KlHBzZ+w+VVkn0+y/2ZtbOaWQ3Wz6Gy8Na25qGFmy+U6VWSfvej9TGUSm4bLuQxuNyhYbmRjUeLac1y7LzKcan4x+Kfur8zNRWUikpFRG5G5BQoenpOpywrPDZu6H1+z6m11zjOKlFpp8013NBPV0TVP6SaoufyL6P6n/BnKJ4+RRvyibWuZJTCSlFNPdPuTuZHPJAAAADAKZPZb77bHGOPuJ7db1CWJjzccHGm4qKfzkly8T+7sdltXihKPmmj521HEu0/PvxMiLjbTNxe/fyf+65np40U5az3cGMXNt+ywQRuD3HV0bggAAbkMAjQ+aLNke/R+fkXSmZDIZtPDmtPMisTKl/cRXsyf8AiJfujYqK/jZ/ZXNmi8M4lt+qQyFHaqjfxS7b7bbI37ClHecX1e2xhPwR9GXySSSSS7Aj1BiUJII3G4wgncgEDCT3+HtSlGccO57xl7kn1XobIjSdHpldqVPg+jLxSfkkbsjGxYzl8qMYz8EgAoeYAAAhmoce8Iw1zH/q8SKjqFMWovtbH6r/AGZuBEkWjJxeovCbg9R81zhKE5QnGUZxfhlGS5prqn6lJ1b4ROD1nQs1bS6/7uK3vqivnopdV9r9Uco7eh0a7FYtR2abo2x1AEA0NtAG5DYIDZk6bg26jkfF18oR+cn2iv5LeDiXZ+QqaF196XaKN1wcSrCx400rZLq+8n5spKRGaXMbHpxMeFFEfDCP6+pdTcWmuT8yAZF8PQpvVq58pd0XDy4zcJKUXs0Z9VqsjuuvdGbXkzcS6NyncggjCrcuUU2ZN0aqYuU5diiqud1ka6ouU5PZJG46PpkMCn2tpXS96S/RehSUsML7lXH9Lml6dXg0eGK8U3zlJ9WzOCJMW9OTKTk9YABBAAAAIJABS4/ccs+Ejg9Y8rNa0uv5N7yyaY/R+2l5ef4nVSicFNNSW6fJpl4TcHqNKrHXLUfNHbcG5/CFwhLRsmWo4Fb/AOnWP24xXzEvL/S/yNL3OjGaktR2YWKcdQbK8ai3LyI0Y8d7JfgvVlqTNt4Yx6oabC6KTstbcn32Ta2/ISeFvbM3TMCnT8dV1LeT5zk+smZe43IMzTACACQya5uE/FH/AOlLAB6NVkbI7p8+/oXIxlKcYQW8pPZJdzzK5zjNeDdyfLZdzeeHNIni1rIzIr4+S5R29xfyZWZE819iqW/Zk6JpUcOtWWpO+S5/ZXkj1tgiTyt6caUnJ6wACCoAAAAAAAAAAABZysenJx7KciuNlU4uM4S6NHDeNeFbeG81OrxT0+6W1Fkubi+vgk/Py8zvDMLVtNxdV0+7BzalZRatnF9vJryafM0rscH+G9Fzql+HzdPoehoWsvT7fiMht4s3/wCN+f3GTxXw9lcOak8a9OdM+dF23KyP8rujwrInv8SWo6ilvyidHUlJJxaafNNPqDUOHdZ/pJLDy5N0S+bm/wDDfl936G3J7rcoeiMuyJ3BAJLBkb/iG9u5tfCug+Lw52dDZdaq33+0yspKK1mVtsao9mX+FtBVMY5ubH5R86oP6C836m1bELkio8UpOT1nDsslZLswACpmAAAAAAAAAAAAAAAAAAeTxJomJr+mzwsyPJ84WL3q5dpI4JrukZWialbg50drIc4zXu2R7SX8dj6QZr/GPDOPxJpzqn4a8qtN4923OL8n6PubVW9Hn0ejj3/zeP0fPdkTbODLc/NjdiKiy6rGr8fxq+hH6r/Yqq+DziezMWNZhV1Q32lkO6LrS81s/F+R17hrh/E4e0uGFhxT+lbbJe1bLvJ/+8lsjey2KXg9lnJVfmPk53umiF1Ns4i4ZsdzyNMqUlLnOlPZp+a/gx9D4XyLr1ZqVTqpjz8Da3n+HRD+sc09C5dbh2/wcL6C8twzcyPyEXvCD+m/N+hvMVskttimEIwiowilFckl2KzyTk5PTkXXStlrAAKmQAAAAAAAAAAAAAAAAAAAAAIfUAAjuVdgAwUhAAgqAAJAAAAAAAAAAAAP/9k=',
                    embed: true,
                    urlConvert: function(url) {
                        const format = url.split('/').slice(-1)[0].split('?')[0];
                        const result = `https://apps.powerapps.com/play/${format}?source=iframe&screenColor=rgba(255,255,255,0)`;
                        return result;
                    }
                }
            }
        ]

    }
}