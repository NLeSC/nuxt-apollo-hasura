openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem

awk -v ORS='\\n' '1' private.pem > privatekey.txt
awk -v ORS='\\n' '1' public.pem  > publickey.txt
