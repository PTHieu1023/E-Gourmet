# Stage 1: Build the Go application
FROM golang:1.23.3 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the source code
COPY . .

# Download dependencies
RUN go mod download

# Build the application
RUN  go build -o main ./cmd/e-gourmet

# Stage 2: Create a lightweight runtime image
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/main .

# Expose the port your application runs on
EXPOSE 8080

# Command to run the application
CMD ["./app/main"]
