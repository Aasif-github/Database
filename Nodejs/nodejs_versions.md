| Version | LTS Status | Release Date | Support Until | V8 Engine | npm Version | Key Features |
|---------|------------|--------------|---------------|-----------|-------------|--------------|
| **v18 (Hydrogen)** | LTS | Oct 2022 | Apr 2025 | 10.7 | 8.19.4 | - Stable `fetch` and `WebStreams` APIs<br>- Built-in test runner (`node:test`)<br>- HTTP/1.1 keepAlive by default<br>- Experimental TypeScript support |
| **v20 (Iron)** | LTS | Apr 2023 | Apr 2026 | 10.8 | 9.6.7 | - HTTP/2 ALPN support<br>- Stable `Permission` model<br>- Enhanced `fs` module APIs<br>- Simplified module loading (`register`, `initialize`) |
| **v21** | Non-LTS | Oct 2023 | Jun 2024 | 11.8 | 10 | - Experimental async module loading<br>- Stricter HTTP parsing (`llhttp` v9.1.2)<br>- Partial `navigator` object<br>- npm with SBOM generation |
| **v22** | LTS | Apr 2024 | Apr 2027 | 11.9 | 10.5.0 | - Stable WebSocket support<br>- Improved ESM loader hooks<br>- Enhanced test runner with coverage<br>- Optimized V8 performance |
| **v23** | Non-LTS | Oct 2024 | Jun 2025 | 12.0 | 10.8.3 | - Experimental `require()` for ESM<br>- Updated OpenSSL 3.0.14<br>- Test runner with sharding<br>- Latest JavaScript features |

### Notes
- **LTS Versions (v18, v20, v22)**: Recommended for production due to stability and long support (30 months).
- **Non-LTS Versions (v21, v23)**: Best for testing new features, not production (6-month support).
- **Performance**: V8 engine upgrades improve speed (v23’s V8 12.0 is fastest).
- **npm**: Evolves from v8 (v18) to v10 (v21+), adding features like SBOM and faster installs.
- **Use Case**:
  - **v20**: Go-to for production (balanced, supported until 2026).
  - **v22**: Newest LTS, ideal for new projects (supported until 2027).
  - **v18**: Still viable but nearing end of support (Apr 2025).
  - **v21, v23**: Experimental, for developers testing cutting-edge features.
- **Version Management**: Use `nvm`, `n`, or `Volta` to switch versions.
- **EOL Warning**: v16 is EOL (Apr 2024); upgrade to v20 or v22 for security.



https://www.geeksforgeeks.org/node-js-versions/
