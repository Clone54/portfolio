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
    img.onerror = () => resolve(''); // Fallback if image fails to load
    img.src = path;
  });
};

export const generateResumePDF = async () => {
  // Load profile image as data URL
  const photoDataUrl = await loadImage('/src/assets/Screenshot 2026-01-19 203415.png');

  // Create a temporary container for the resume HTML
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
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#f5f5f5'
    });

    // Create PDF from canvas
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
    <div style="display: flex; height: 100%; background: #f5f5f5; margin: 0; padding: 0;">
      <!-- LEFT SIDEBAR -->
      <div style="width: 35%; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: white; padding: 30px 20px; display: flex; flex-direction: column;">
        <!-- PROFILE PHOTO -->
        <div style="width: 100%; aspect-ratio: 3.6/4; background: linear-gradient(135deg, #0f4c5c 0%, #1e3a5f 100%); border-radius: 8px; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: rgba(255,255,255,0.6); overflow: hidden;">
          <img src="${photoUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>

        <!-- CONTACT ME -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #fbbf24; font-size: 14px; font-weight: bold; margin: 0 0 12px 0; text-transform: uppercase;">📍 CONTACT ME</h3>
          <div style="font-size: 11px; line-height: 1.6; color: #e2e8f0;">
            <div>📞 ${PERSONAL_INFO.phone}</div>
            <div>📧 ${PERSONAL_INFO.email}</div>
            <div>📍 ${PERSONAL_INFO.location}</div>
          </div>
        </div>

        <!-- SKILLS -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #fbbf24; font-size: 14px; font-weight: bold; margin: 0 0 12px 0; text-transform: uppercase;">⚙️ SKILLS</h3>
          <div style="font-size: 10px; line-height: 2;">
            ${SKILLS.slice(0, 6).map(skill => `
              <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span style="flex: 1;">${skill.name}</span>
                <span style="color: #fbbf24; font-weight: bold;">${skill.level}%</span>
              </div>
              <div style="height: 4px; background: #334155; border-radius: 2px; margin-bottom: 6px; overflow: hidden;">
                <div style="height: 100%; background: #fbbf24; width: ${skill.level}%; border-radius: 2px;"></div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- INTERESTS -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #fbbf24; font-size: 14px; font-weight: bold; margin: 0 0 12px 0; text-transform: uppercase;">🎯 INTEREST</h3>
          <div style="display: flex; flex-wrap: wrap; font-size: 11px; line-height: 1.8; color: #e2e8f0;">
            ${['Football', 'Competitive Sports', 'Electronics', 'Web Technologies'].map(item => `
              <div style="flex: 0 0 50%;">• ${item}</div>
            `).join('')}
          </div>
        </div>

        <!-- LANGUAGES -->
        <div style="margin-bottom: 25px;">
          <h3 style="color: #fbbf24; font-size: 14px; font-weight: bold; margin: 0 0 12px 0; text-transform: uppercase;">🌐 LANGUAGE</h3>
          <div style="display: flex; flex-wrap: wrap; font-size: 11px; line-height: 1.8; color: #e2e8f0;">
            ${['English', 'Bengali', 'Hindi'].map(lang => `
              <div style="flex: 0 0 50%;">• ${lang}</div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- RIGHT CONTENT -->
      <div style="width: 65%; background: white; padding: 40px 30px; display: flex; flex-direction: column; overflow-y: auto;">
        <!-- HEADER -->
        <div style="margin-bottom: 20px; border-bottom: 2px solid #001f3f; padding-bottom: 15px;">
          <h1 style="margin: 0; color: #001f3f; font-size: 32px; font-weight: bold; text-transform: uppercase;">${PERSONAL_INFO.name}</h1>
          <p style="margin: 5px 0 0 0; color: #334155; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">${PERSONAL_INFO.designation}</p>
        </div>

        <!-- ABOUT US -->
        <div style="margin-bottom: 18px;">
          <h2 style="margin: 0 0 8px 0; color: #001f3f; font-size: 13px; font-weight: bold; text-transform: uppercase;">ABOUT ME</h2>
          <p style="margin: 0; color: #475569; font-size: 10px; line-height: 1.5;">${PERSONAL_INFO.bio}</p>
        </div>

        <!-- WORK EXPERIENCE -->
        <div style="margin-bottom: 18px;">
          <h2 style="margin: 0 0 10px 0; color: #001f3f; font-size: 13px; font-weight: bold; text-transform: uppercase;">WORK EXPERIENCE</h2>
          ${EXPERIENCES.map(exp => `
            <div style="margin-bottom: 12px; display: flex;">
              <div style="color: #001f3f; font-weight: bold; margin-right: 10px;">●</div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #001f3f; font-weight: bold; font-size: 11px;">${exp.company}</span>
                  <span style="color: #475569; font-size: 10px; font-weight: bold;">${exp.period}</span>
                </div>
                <div style="color: #001f3f; font-size: 10px; font-weight: bold;">${exp.position}</div>
                <p style="margin: 4px 0 0 0; color: #475569; font-size: 9px; line-height: 1.4;">
                  ${exp.description[0]}
                </p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- EDUCATION -->
        <div style="margin-bottom: 18px;">
          <h2 style="margin: 0 0 10px 0; color: #001f3f; font-size: 13px; font-weight: bold; text-transform: uppercase;">EDUCATION</h2>
          ${EDUCATION.map(edu => `
            <div style="margin-bottom: 12px; display: flex;">
              <div style="color: #001f3f; font-weight: bold; margin-right: 10px;">●</div>
              <div style="flex: 1;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #001f3f; font-weight: bold; font-size: 11px;">${edu.institution}</span>
                  <span style="color: #475569; font-size: 10px; font-weight: bold;">${edu.period}</span>
                </div>
                <div style="color: #001f3f; font-size: 10px; font-weight: bold;">${edu.degree}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- TECHNOLOGIES -->
        <div>
          <h2 style="margin: 0 0 10px 0; color: #001f3f; font-size: 13px; font-weight: bold; text-transform: uppercase;">TECHNOLOGIES</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            ${SKILLS.map(skill => `
              <div style="font-size: 9px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
                  <span style="color: #001f3f; font-weight: bold;">${skill.name}</span>
                  <span style="color: #475569; font-weight: bold;">${skill.level}%</span>
                </div>
                <div style="height: 3px; background: #cbd5e1; border-radius: 1px; overflow: hidden;">
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
