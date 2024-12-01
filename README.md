run following commands to run server

#in ### `.env` update the variables as 

```
PORT=3003
MONGO_URI="<mongoURL>/editor"
AUTH_SECRET_KEY="s@h*l##" #example

```

run following command
### `npm i`
### `npm run dev`


Before Start Frontend app Please Create some users via API provided

example

```
curl --location 'http://localhost:3003/api/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "samPete",
    "password": "77117777Sampete",
    "email": "samPete@gmail.com"
}'

```


### login ###

```
curl --location 'http://localhost:3003/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{

    "password": "19971997Sampete",
    "email": "pete@gmail.com"
}'

```

*** Response ***

```
{
    "status": 200,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRhRGF0YSI6eyJlbmNyeXB0ZWREYXRhIjoiMjE2ZTcxNjZmZGZjYzIwOWM0MjBiNjZlOGQ3NjgxZmRhYjczMmFmYmVmNzE0NWM5ZGE3YWY2NTU4YjdmNjU4MzczYWE1ZTY4N2RiZTJlYTc0MDViMzhiMWE4N2YwMTE4ZWMzOGY4MTk0MzJlYzg2N2UxYjgxMDgwZGRiOWRjNWQifSwiaWF0IjoxNzMzMDc4MzI4LCJleHAiOjE3MzMxNjQ3Mjh9.K2gtmoR0RpO950w5YnFF8l3iv3wBvlP6IX15rf31FYU",
    "username": "pete620",
    "email": "pete@gmail.com"
}

```

then create some dummy docs via API example


```
curl --location 'http://localhost:3003/api/document/createDoc' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRhRGF0YSI6eyJlbmNyeXB0ZWREYXRhIjoiMmQ2OWZjYThjNTY5MDJiNTE2OWRiNjI5YzEwNTAzYTJmNjgwM2UwMGI3YjQ4ZjMyMDA0MWYxMzBhMzBkOTc3ZWMxOWEyY2U2MTM2N2MzNWM1MzJhOGM5MTgzNmNjNTdkZGM2YTUxZGUxYTZjMTkzMWM3MzcwNWFhYTliNjE2YWMifSwiaWF0IjoxNzMzMDU0MTQxLCJleHAiOjE3MzMxNDA1NDF9.rIIF8Izp4DI4Sof4PoriVJkpnrrmykXVjyp03ggX1LY' \
--header 'Content-Type: application/json' \
--data-raw '{
    "content":"hey there", 
    "title":"Creatimg mern method doc" ,
    "created_by": "samPete@gmail.com",
    "collaboration": []

}'

```


OPTIONAL! this for version update


```
curl --location 'http://localhost:3003/api/document/createNewVersionDoc' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRhRGF0YSI6eyJlbmNyeXB0ZWREYXRhIjoiMmQ2OWZjYThjNTY5MDJiNTE2OWRiNjI5YzEwNTAzYTJmNjgwM2UwMGI3YjQ4ZjMyMDA0MWYxMzBhMzBkOTc3ZWMxOWEyY2U2MTM2N2MzNWM1MzJhOGM5MTgzNmNjNTdkZGM2YTUxZGUxYTZjMTkzMWM3MzcwNWFhYTliNjE2YWMifSwiaWF0IjoxNzMzMDU0MTQxLCJleHAiOjE3MzMxNDA1NDF9.rIIF8Izp4DI4Sof4PoriVJkpnrrmykXVjyp03ggX1LY' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "Figma method doc",
    "content": "hey there tyu wihejfbejf  efjefekfekjfbe efehfkefheif",
    "created_by": "sohelpatel620@gmail.com",
    "collaboration": [
        "pete@gmail.com"],
"parent_id": "20241201-203410-8b9b2da1",
"created_at": "2024-12-01T15:04:10.356Z",
"last_updated_by": "pete@gmail.com"
}'

```

fetch docs created


```

curl --location 'http://localhost:3003/api/document/getdocument?id=674c514b2dddea30f7a32acb' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXRhRGF0YSI6eyJlbmNyeXB0ZWREYXRhIjoiMmQ2OWZjYThjNTY5MDJiNTE2OWRiNjI5YzEwNTAzYTJmNjgwM2UwMGI3YjQ4ZjMyMDA0MWYxMzBhMzBkOTc3ZWMxOWEyY2U2MTM2N2MzNWM1MzJhOGM5MTgzNmNjNTdkZGM2YTUxZGUxYTZjMTkzMWM3MzcwNWFhYTliNjE2YWMifSwiaWF0IjoxNzMzMDU0MTQxLCJleHAiOjE3MzMxNDA1NDF9.rIIF8Izp4DI4Sof4PoriVJkpnrrmykXVjyp03ggX1LY' \
--data ''

```


#response

```
{
    "total": 2,
    "data": [
        {
            "_id": "674c7e3e76c3a76c984886f2",
            "title": "Creatimg mern method doc",
            "content": "hi am alica how are you dev",
            "version": 1,
            "created_by": "sohelpatel620@gmail.com",
            "collaboration": [
                {}
            ],
            "parent_id": "20241201-204822-8b9b2da1",
            "created_at": "2024-12-01T15:18:22.026Z",
            "last_updated_at": "2024-12-01T19:35:34.583Z",
            "last_updated_by": "sohel620@gmail.com"
        },
        {
            "_id": "674c83b97d36f74af2c51078",
            "title": "Figma method doc",
            "content": "I am Iron man I am person build with ore of steel and metal",
            "version": 3,
            "created_by": "sohelpatel620@gmail.com",
            "collaboration": [
                "pete@gmail.com",
                "york@gmail.com"
            ],
            "parent_id": "20241201-203410-8b9b2da1",
            "created_at": "2024-12-01T15:04:10.356Z",
            "last_updated_at": "2024-12-01T17:01:26.320Z",
            "last_updated_by": "pete@gmail.com"
        }
    ]
}
```

