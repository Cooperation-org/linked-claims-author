// const fs = require('fs')
// const path = require('path')

// const colorMap = {
//   '#ffffff': 'theme.palette.t3White',
//   '#000000': 'theme.palette.t3Black',
//   '#202e5b': 'theme.palette.t3BodyText',
//   '#003fe0': 'theme.palette.t3ButtonBlue',
//   '#ffcb25': 'theme.palette.t3YellowAccent',
//   '#e5e7eb': 'theme.palette.t3LightGray',
//   '#4d4d4d': 'theme.palette.t3DarkGray',
//   '#79747e': 'theme.palette.t3Gray',
//   '#b8b8b8': 'theme.palette.t3MediumGray',
//   '#ebebeb': 'theme.palette.t3VeryLightGray',
//   '#e7e6e6': 'theme.palette.t3LightGraySecondary',
//   '#f9f9f9': 'theme.palette.t3NewWhitesmoke',
//   '#f6f6f6': 'theme.palette.t3Whitesmoke',
//   '#d1d5db': 'theme.palette.t3Disabled',
//   '#f8fafc': 'theme.palette.t3VeryLightDisabled',
//   '#000e40': 'theme.palette.t3MidnightBlue',
//   '#242f56': 'theme.palette.t3DarkSlateBlue',
//   '#d1e4ff': 'theme.palette.t3LightBlue',
//   '#003fe080': 'theme.palette.t3BackgroundDarkBlue',
//   '#1e40af1a': 'theme.palette.t3CheckboxSoftActive',
//   '#2563eb': 'theme.palette.t3CheckboxBorderActive',
//   '#4e4e4e': 'theme.palette.t3PlaceholderText',
//   '#6b7280': 'theme.palette.t3InputPlaceholder',
//   '#1f2937': 'theme.palette.t3TitleText',
//   '#14b8a6': 'theme.palette.t3SuccessMessage',
//   '#ef4444': 'theme.palette.t3Error',
//   '#6750a4': 'theme.palette.t3Purple',
//   '#f7f7f7': 'theme.palette.t3LightWhitesmoke',
//   '#ffcb25e6': 'theme.palette.t3Gold',
//   '#d1e3ff': 'theme.palette.t3Lavender',
//   '#f81414': 'theme.palette.t3Red'
// }

// function replaceColors(filePath) {
//   let fileContent = fs.readFileSync(filePath, 'utf-8')

//   // Avoid replacing colors inside SVG tags
//   const svgRegex = /<svg[\s\S]*?<\/svg>/g
//   let svgMatches = []
//   let match
//   while ((match = svgRegex.exec(fileContent)) !== null) {
//     svgMatches.push(match[0])
//   }

//   svgMatches.forEach(svg => {
//     fileContent = fileContent.replace(svg, '__SVG_PLACEHOLDER__')
//   })

//   // Replace color codes with variables without curly braces
//   Object.keys(colorMap).forEach(hexColor => {
//     const variableName = `${colorMap[hexColor]}`
//     const regex = new RegExp(`(['"])${hexColor}\\1`, 'gi')
//     fileContent = fileContent.replace(regex, variableName)
//   })

//   // Ensure useTheme import is present
//   const useThemeImport = "import { useTheme } from '@mui/material/styles'"
//   if (!fileContent.includes(useThemeImport)) {
//     if (fileContent.includes("'use client'")) {
//       fileContent = fileContent.replace("'use client'", `'use client'\n${useThemeImport}`)
//     } else {
//       fileContent = `${useThemeImport}\n${fileContent}`
//     }
//   }

//   // Remove redundant declarations of const theme = useTheme()
//   const themeDeclaration = 'const theme = useTheme()'
//   const themeDeclarationRegex = new RegExp(`\\b${themeDeclaration}\\b`, 'g')
//   const themeDeclarations = fileContent.match(themeDeclarationRegex)
//   if (themeDeclarations && themeDeclarations.length > 1) {
//     fileContent = fileContent.replace(themeDeclarationRegex, '')
//   }

//   // Insert only one theme declaration at the top of the first function component
//   const functionComponentRegex =
//     /(function\s+\w+\s*\([^)]*\)\s*{)|(const\s+\w+\s*=\s*\(\s*\)\s*=>\s*{)|(export\s+default\s+function\s+\w+\s*\([^)]*\)\s*{)/g
//   let functionsFound = functionComponentRegex.exec(fileContent)
//   if (functionsFound) {
//     const funcDeclaration = functionsFound[0]
//     const funcBodyStartIndex = functionsFound.index + funcDeclaration.length
//     fileContent =
//       fileContent.slice(0, funcBodyStartIndex) +
//       `\n  ${themeDeclaration}\n` +
//       fileContent.slice(funcBodyStartIndex)
//   }

//   // Restore SVG content
//   svgMatches.forEach(svg => {
//     fileContent = fileContent.replace('__SVG_PLACEHOLDER__', svg)
//   })

//   fs.writeFileSync(filePath, fileContent, 'utf-8')
//   console.log(`Updated file: ${filePath}`)
// }

// function scanDirectory(directoryPath) {
//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       return console.error(`Unable to scan directory: ${err}`)
//     }

//     files.forEach(file => {
//       const filePath = path.join(directoryPath, file)
//       const fileExt = path.extname(file).toLowerCase()

//       if (fs.statSync(filePath).isDirectory()) {
//         scanDirectory(filePath)
//       } else if (
//         fs.statSync(filePath).isFile() &&
//         (fileExt === '.js' ||
//           fileExt === '.ts' ||
//           fileExt === '.tsx' ||
//           fileExt === '.jsx') &&
//         file !== 'theme.ts'
//       ) {
//         replaceColors(filePath)
//       }
//     })
//   })
// }

// const directoryPath = 'E:\\linkedClaims playground\\app'
// scanDirectory(directoryPath)
