import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PERSONAL_INFO, SKILLS, EXPERIENCES, EDUCATION } from '../data';

const loadImage = async (path: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      }
    };
    img.onerror = () => resolve('');
    img.src = path;
  });
};

export const generateResumePDF = async () => {
  const photoDataUrl = await loadImage('/profile.png');

  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.width = '210mm';
  container.style.height = '297mm';
  container.style.backgroundColor = '#f5f5f5';
  container.style.fontFamily = 'Arial, sans-serif';
  container.innerHTML = generateResumeHTML(photoDataUrl);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#f5f5f5'
    });

    const doc = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 0, 0, 210, 297);
    doc.save(`${PERSONAL_INFO.name.replace(/\s+/g, '_')}_Resume.pdf`);
  } finally {
    document.body.removeChild(container);
  }
};

const generateResumeHTML = (photoUrl: string) => {
  return `
    <div style="display: flex; height: 100%; background: #f5f5f5; margin: 0; padding: 0; font-family: Arial, sans-serif; font-size: 12px;">
      <!-- LEFT SIDEBAR -->
      <div style="width: 32%; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 22px 12px; display: flex; flex-direction: column; box-sizing: border-box;">

        <!-- PROFILE PHOTO -->
        <div style="width: 100%; aspect-ratio: 3/4; background: linear-gradient(135deg, #0f4c5c 0%, #1e3a5f 100%); border-radius: 6px; margin-bottom: 18px; display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
          <img src="${photoUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>

        <!-- CONTACT ME -->
        <div style="margin-bottom: 16px;">
          <h3 style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0 0 7px 0; text-transform: uppercase; letter-spacing: 0.4px;">📍 CONTACT</h3>
          <div style="font-size: 9px; line-height: 1.4; color: #e2e8f0; word-break: break-word;">
            <div style="margin-bottom: 2px;">📞 ${PERSONAL_INFO.phone}</div>
            <div style="margin-bottom: 2px; overflow-wrap: break-word;">📧 ${PERSONAL_INFO.email}</div>
            <div style="margin-bottom: 2px;">📍 ${PERSONAL_INFO.location}</div>
          </div>
        </div>

        <!-- SKILLS -->
        <div style="margin-bottom: 16px;">
          <h3 style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0 0 7px 0; text-transform: uppercase; letter-spacing: 0.4px;">⚙️ SKILLS</h3>
          <div style="font-size: 8.5px; line-height: 1.6;">
            ${SKILLS.slice(0, 5).map(skill => `
              <div style="display: flex; align-items: center; margin-bottom: 5px; gap: 4px;">
                <span style="flex: 1; min-width: 0; word-break: break-word;">${skill.name}</span>
                <span style="color: #fbbf24; font-weight: bold; white-space: nowrap; font-size: 8px;">${skill.level}%</span>
              </div>
              <div style="height: 2.5px; background: #334155; border-radius: 1px; margin-bottom: 3px; overflow: hidden;">
                <div style="height: 100%; background: #fbbf24; width: ${skill.level}%; border-radius: 1px;"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- INTERESTS -->
        <div style="margin-bottom: 16px;">
          <h3 style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0 0 7px 0; text-transform: uppercase; letter-spacing: 0.4px;">🎯 INTEREST</h3>
          <div style="font-size: 9px; line-height: 1.5; color: #e2e8f0;">
            ${['Football', 'Sports', 'Electronics', 'Web Tech'].map(item => `<div>• ${item}</div>`).join('')}
          </div>
        </div>

        <!-- LANGUAGES -->
        <div>
          <h3 style="color: #fbbf24; font-size: 11px; font-weight: bold; margin: 0 0 7px 0; text-transform: uppercase; letter-spacing: 0.4px;">🌐 LANGUAGE</h3>
          <div style="font-size: 9px; line-height: 1.5; color: #e2e8f0;">
            ${['English', 'Bengali', 'Hindi'].map(lang => `<div>• ${lang}</div>`).join('')}
          </div>
        </div>
      </div>

      <!-- RIGHT CONTENT -->
      <div style="width: 68%; background: white; padding: 22px 16px; display: flex; flex-direction: column; box-sizing: border-box; overflow: hidden;">

        <!-- HEADER -->
        <div style="margin-bottom: 12px; border-bottom: 2.5px solid #001f3f; padding-bottom: 8px;">
          <h1 style="margin: 0; color: #001f3f; font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.8px; line-height: 1.1; word-break: break-word;">${PERSONAL_INFO.name}</h1>
          <p style="margin: 3px 0 0 0; color: #334155; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.4px;">${PERSONAL_INFO.designation}</p>
        </div>

        <!-- ABOUT US -->
        <div style="margin-bottom: 12px;">
          <h2 style="margin: 0 0 5px 0; color: #001f3f; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.4px;">ABOUT US</h2>
          <p style="margin: 0; color: #475569; font-size: 8.5px; line-height: 1.35;">${PERSONAL_INFO.bio}</p>
        </div>

        <!-- WORK EXPERIENCE -->
        <div style="margin-bottom: 12px;">
          <h2 style="margin: 0 0 7px 0; color: #001f3f; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.4px;">WORK EXPERIENCE</h2>
          ${EXPERIENCES.map(exp => `
            <div style="margin-bottom: 8px; display: flex;">
              <div style="color: #001f3f; font-weight: bold; margin-right: 6px; margin-top: 1px; flex-shrink: 0;">●</div>
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; justify-content: space-between; gap: 6px; flex-wrap: wrap;">
                  <span style="color: #001f3f; font-weight: bold; font-size: 9px; word-break: break-word;">${exp.company}</span>
                  <span style="color: #475569; font-size: 8.5px; font-weight: bold; white-space: nowrap;">${exp.period}</span>
                </div>
                <div style="color: #001f3f; font-size: 8.5px; font-weight: bold;">${exp.position}</div>
                <p style="margin: 2px 0 0 0; color: #475569; font-size: 8px; line-height: 1.25;">
                  ${exp.description[0]}
                </p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- EDUCATION -->
        <div style="margin-bottom: 12px;">
          <h2 style="margin: 0 0 7px 0; color: #001f3f; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.4px;">EDUCATION</h2>
          ${EDUCATION.map(edu => `
            <div style="margin-bottom: 8px; display: flex;">
              <div style="color: #001f3f; font-weight: bold; margin-right: 6px; margin-top: 1px; flex-shrink: 0;">●</div>
              <div style="flex: 1; min-width: 0;">
                <div style="display: flex; justify-content: space-between; gap: 6px; flex-wrap: wrap;">
                  <span style="color: #001f3f; font-weight: bold; font-size: 9px; word-break: break-word;">${edu.institution}</span>
                  <span style="color: #475569; font-size: 8.5px; font-weight: bold;">${edu.period}</span>
                </div>
                <div style="color: #001f3f; font-size: 8.5px; font-weight: bold;">${edu.degree}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- TECHNOLOGIES -->
        <div>
          <h2 style="margin: 0 0 7px 0; color: #001f3f; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.4px;">TECHNOLOGIES</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            ${SKILLS.map(skill => `
              <div style="font-size: 8px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 1.5px; gap: 3px; flex-wrap: wrap;">
                  <span style="color: #001f3f; font-weight: bold; word-break: break-word;">${skill.name}</span>
                  <span style="color: #475569; font-weight: bold; white-space: nowrap; font-size: 7.5px;">${skill.level}%</span>
                </div>
                <div style="height: 2px; background: #cbd5e1; border-radius: 1px; overflow: hidden;">
                  <div style="height: 100%; background: #001f3f; width: ${skill.level}%; border-radius: 1px;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
};
