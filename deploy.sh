# delete all files in the frontend bucket
# note that the bucket should have the same name as the current working dir
aws s3 rm s3://${PWD##*/} --recursive

# copy all files in /dist to the AWS bucket
aws s3 cp dist s3://${PWD##*/} --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive
