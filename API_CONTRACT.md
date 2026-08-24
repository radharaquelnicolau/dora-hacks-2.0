# API Contract

The frontend expects the following JSON endpoints from the backend:

- `GET /transactions` returns `Transaction[]`.
- `GET /ratios` returns `RatioCategory[]`.
- `PUT /ratios` accepts updated ratio data and returns `RatioCategory[]`.
- `GET /wrap` returns `WrapCard[]`.

The API base URL is configured with `NEXT_PUBLIC_API_URL`.
