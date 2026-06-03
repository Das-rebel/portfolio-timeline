FROM nginx:alpine
COPY nginx.conf /etc/nginx/http.d/default.conf
EXPOSE 8080
# Don't daemonize - let nginx run in foreground for Cloud Run
