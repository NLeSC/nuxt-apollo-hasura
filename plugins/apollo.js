export default function ({ app }) {
  const client = app.apolloProvider.defaultClient
  client.wsClient.lazy = true
  client.wsClient.connectionParams = () => {
    // console.log('🎹', app?.$cookies.get('auth.jwt_token'))
    return {
      headers: {
        Authorization: `Bearer ${app.$cookies.get('auth.jwt_token')}`,
        // Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkdrRk9ocXFxMW9nWEtYSnJZeWdyM3dwMTJ1QUZMTjloQlFUZkRiSjAzZGcifQ.eyJodHRwczovL2hhc3VyYS5pby9qd3QvY2xhaW1zIjp7IngtaGFzdXJhLXVzZXItaWQiOiI3ZGEyMGVhYS05MDAzLTQzMWItODY2NS1iODNkZWZmMzJkNGMiLCJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbInVzZXIiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoidXNlciJ9LCJpYXQiOjE1OTIxNjM3NTMsImV4cCI6MTU5MjE2NDY1M30.a7i_B0a8ySVDdzVVh_q6nIRNpsp7QzLK1LCqjs0M7dMayoIafGzekwqU7KY2mfCUtcblhBz7DneOb4R2Ia4LOFpIZM38iCeHOWm0eVrQlwd-IneL4HCZZ54k_PHzbLjgFQjczmBk6p6zN8TVxM3Erl-d28sjLr9oOyzGNvKiPtpIB9zuygutlwTivY8BKp8KOxFoxy7Tev4aGzNufZIDk6O_qTOCBBVgxyeBNgSsGeJYzndOKfOrmQAZ1pDSmQGwsjaU2rc-hYVe9PxbA_63hQmO_ZJEpkeb_cYT0GZs7WFBJmRCWguVNE6ebIWi8ws4EmdyoXe9ol5UFvLkNxvwWQ`,
      },
    }
  }
}
