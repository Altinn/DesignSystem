using System;
using System.Diagnostics;
using System.IO;
using System.Runtime.CompilerServices;
using System.Threading;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.IE;
using OpenQA.Selenium.Opera;

namespace PatternLabSelenium.Tests
{
    /// <summary>
    /// Base class for all tests. Setup, tear down, screenshots
    /// </summary>
    public abstract class TestBase
    {
        //private const string ScreenshotPath = @"..\..\Screenshots";
        //private const string DriverPath = @"..\..\SeleniumDriver";
        private const string ScreenshotPath = @"..\..\Screenshots";
        private const string DriverPath = @"SeleniumDriver";

        private static IWebDriver _driverChrome;
        private static IWebDriver _driverFirefox;
        private static IWebDriver _driverOpera;
        private static IWebDriver _driverExplorer;

        /// <summary>
        /// Initializes a new instance of the <see cref="TestBase"/> class. 
        /// Instantiates and starts driver services
        /// </summary>
        protected TestBase()
        {
            try
            {
                string driverFullPath = Path.GetFullPath(DriverPath);
                //set up drivers
                _driverChrome = new ChromeDriver();

                // TODO: Task 1468 remove driver binary from project
                //_driverOpera = new OperaDriver(DriverPath);

                // TODO: Task 1468 remove driver binary from project + find a way not to reference firefox binary path
                FirefoxDriverService firefoxDriverService = FirefoxDriverService.CreateDefaultService(DriverPath);
                firefoxDriverService.FirefoxBinaryPath = @"C:\Program Files (x86)\Mozilla Firefox\firefox.exe";
                _driverFirefox = new FirefoxDriver(firefoxDriverService);

                InternetExplorerOptions options = new InternetExplorerOptions { IgnoreZoomLevel = true };
                _driverExplorer = new InternetExplorerDriver(options);
            }
            catch (Exception ex)
            {
                TearDown();
                throw new Exception("Unable to set up drivers. ", ex);
            }
        }

        /// <summary>
        /// Receive method to run as action and run once for each browser
        /// </summary>
        /// <param name="testToRun">test to run in browsers</param>
        public void RunTestInBrowsers(Action<IWebDriver> testToRun)
        {
            testToRun(_driverChrome);
            //testToRun(_driverOpera);
            testToRun(_driverFirefox);
            testToRun(_driverExplorer);
        }
        
        /// <summary>
        /// Quit all running driver services
        /// </summary>
        [TestCleanup]
        public void TearDown()
        {
            _driverChrome?.Quit();
            _driverOpera?.Quit();
            _driverFirefox?.Quit();
            _driverExplorer?.Quit();
        }

        /// <summary>
        /// Helper method for retrieving current method name
        /// </summary>
        /// <returns>name of current method</returns>
        [MethodImpl(MethodImplOptions.NoInlining)]
        public string GetCurrentMethod()
        {
            StackTrace stackTrace = new StackTrace();
            StackFrame stackFrame = stackTrace.GetFrame(1);

            return stackFrame.GetMethod().Name;
        }

        /// <summary>
        /// Captures screenshots of current browser state and saves them to a given location
        /// </summary>
        /// <param name="driver">current driver running tests</param>
        /// <param name="testClass">class that initiated the call to this method</param>
        /// <param name="testName">name of method that initiated the call</param>
        /// <param name="action">custom specified description string of the action being tested/performed</param>
        public void ScreenshotCapture(IWebDriver driver, string testClass, string testName, string action)
        {
            string browserName = driver.GetType().ToString().Split('.')[2];

            Thread.Sleep(1000);
            Screenshot ss = ((ITakesScreenshot)driver).GetScreenshot();

            string pathAbsolute = Path.GetFullPath(ScreenshotPath);

            ss.SaveAsFile(pathAbsolute + "\\" + browserName + "\\" + DateTime.Today.Day + "." + DateTime.Today.Year + "-"
                 + action + "-" + testName + "-" + testClass + ".jpeg", 
                 System.Drawing.Imaging.ImageFormat.Jpeg);
        }

        /// <summary>
        /// Custom error message for assertion
        /// </summary>
        /// <param name="driver">Driver currently running</param>
        /// <param name="found">Item being compared</param>
        /// <param name="expected">Item expected by comparison</param>
        /// <returns>Custom error message</returns>
        public string AssertionFailedErrorMessage(IWebDriver driver, string found, string expected)
        {
            return "Failed for: " + driver.GetType().ToString().Split('.')[2] + ". Text found: \"" + found +
                   "\". Expected: \"" + expected + "\"";
        }
    }
}
