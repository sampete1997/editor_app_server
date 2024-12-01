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

