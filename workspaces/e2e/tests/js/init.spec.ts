import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.routeWebSocket(
    (url) => url.pathname === "/ws/sdk/block-updates",
    () => {},
  );
});

test("should call blocks with correct parameters", async ({ page }) => {
  await page.route("**/v2/sdk/blocks", (route) => {
    route.fulfill({ json: { blocks: [] } });
  });
  const blocksReq = page.waitForRequest((req) => {
    const body = req.postDataJSON();
    return (
      req.url() === "https://api.flows-cloud.com/v2/sdk/blocks" &&
      body.organizationId === "orgId" &&
      body.userId === "testUserId" &&
      body.environment === "prod" &&
      body.userProperties.email === "test@flows.sh" &&
      body.userProperties.age === 10
    );
  });
  await page.goto(`/js/index.html`);
  await blocksReq;
});
test("should call custom apiUrl", async ({ page }) => {
  await page.route("**/v2/sdk/blocks", (route) => {
    route.fulfill({ json: { blocks: [] } });
  });
  const blocksReq = page.waitForRequest((req) => {
    const body = req.postDataJSON();
    return (
      req.url() === "https://custom.api.flows.com/v2/sdk/blocks" &&
      body.organizationId === "orgId" &&
      body.userId === "testUserId" &&
      body.environment === "prod" &&
      body.userProperties.email === "test@flows.sh" &&
      body.userProperties.age === 10
    );
  });
  await page.goto(`/js/index.html?apiUrl=${encodeURIComponent("https://custom.api.flows.com")}`);
  await blocksReq;
});