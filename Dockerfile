FROM node:alpine

#update 
RUN apk update && apk update 
#end update
# buat direktory
RUN mkdir /app
# end buat direktory
# menambahkan ke direktory
ADD . /app 
#end menambahkan ke direktory
# set work direktory 
WORKDIR /app
#end set work direktory 

RUN npm update

CMD npm start

