# Sử dụng image Node.js làm base
FROM node:18

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng React
RUN npm run build

# Expose cổng 3000
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]
